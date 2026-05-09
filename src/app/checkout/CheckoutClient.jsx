"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, MapPin, CreditCard, CheckCircle, ArrowLeft, ArrowRight, Upload } from "lucide-react";
import toast from "react-hot-toast";

const STEPS = [
  { id: 1, title: "Review Order", icon: ShoppingBag },
  { id: 2, title: "Shipping Details", icon: MapPin },
  { id: 3, title: "Payment", icon: CreditCard },
];

// PAYMENT_METHODS will now be fetched dynamically from the API

export default function CheckoutClient() {
  const { cartItems, cartTotal, removeFromCart } = useCart();
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [mounted, setMounted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    whatsapp: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      router.push("/collections");
    }

    // Fetch dynamic payment methods
    const loadPaymentMethods = async () => {
      try {
        const { fetchActivePaymentMethods } = require("@/lib/api");
        const res = await fetchActivePaymentMethods();
        setPaymentMethods(res.data || []);
      } catch (err) {
        console.error("Failed to load payment methods", err);
      }
    };
    loadPaymentMethods();
  }, [cartItems, router]);

  if (!mounted || cartItems.length === 0) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const nextStep = () => {
    if (currentStep === 2) {
      // Validate Form
      if (!formData.fullName || !formData.phone || !formData.address || !formData.city) {
        toast.error("Please fill in all required fields");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    setIsSubmitting(true);
    try {
      // Import here to avoid top-level issues if needed, or import at top
      const { createOrder } = require("@/lib/api");
      
      const payload = {
        items: cartItems.map(item => ({
          productId: item._id || item.id,
          quantity: item.quantity,
          selectedVariant: item.selectedVariant
        })),
        customerDetails: {
          fullName: formData.fullName,
          email: formData.email || undefined,
          phone: formData.phone,
          whatsapp: formData.whatsapp || undefined,
          address: formData.address,
          city: formData.city,
          province: formData.province || undefined,
          postalCode: formData.postalCode || undefined,
          notes: formData.notes || undefined,
        },
        paymentDetails: {
          method: paymentMethod
        },
        currency: "PKR"
      };

      const res = await createOrder(payload);
      
      toast.success("Order Placed Successfully!");
      
      // Pass the order ID to the success page for tracking
      const orderId = res.data?._id || res.data?.id;
      if (orderId) {
        router.push(`/checkout/success?orderId=${orderId}`);
      } else {
        router.push("/checkout/success");
      }
      
    } catch (error) {
      console.error("Order error:", error);
      toast.error(error?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Account number copied!");
  };

  const selectedPaymentDetails = paymentMethods.find((m) => m.methodId === paymentMethod);

  return (
    <div className="section-spacer bg-[var(--bg-primary)] min-h-screen">
      <div className="container-luxe max-w-5xl">
        
        <h1 className="text-4xl text-center mb-10 font-serif" style={{ color: "var(--text-primary)" }}>
          Secure Checkout
        </h1>

        {/* Progress Steps */}
        <div className="flex justify-between items-center mb-12 relative max-w-3xl mx-auto px-4">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-[var(--border-default)] -z-10" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-[2px] bg-[var(--color-gold)] -z-10 transition-all duration-500" 
            style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }} 
          />
          
          {STEPS.map((step) => {
            const Icon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;
            
            return (
              <div key={step.id} className="flex flex-col items-center gap-3 relative bg-[var(--bg-primary)] px-2">
                <motion.div 
                  initial={false}
                  animate={{ 
                    backgroundColor: isActive ? "var(--color-gold)" : "var(--bg-secondary)",
                    borderColor: isActive ? "var(--color-gold)" : "var(--border-default)",
                    color: isActive ? "#ffffff" : "var(--text-secondary)",
                    scale: isCurrent ? 1.1 : 1
                  }}
                  className="w-12 h-12 rounded-full border-2 flex items-center justify-center transition-colors duration-300"
                >
                  <Icon size={20} />
                </motion.div>
                <span className="text-xs font-medium uppercase tracking-widest hidden sm:block" 
                  style={{ color: isActive ? "var(--color-gold)" : "var(--text-secondary)" }}>
                  {step.title}
                </span>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              
              {/* STEP 1: REVIEW ORDER */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-luxe p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-serif mb-6 border-b pb-4" style={{ color: "var(--text-primary)", borderColor: "var(--border-light)" }}>
                    Order Summary
                  </h2>
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <div key={item.cartItemId} className="flex gap-4 items-center">
                        <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-zinc-800">
                          <Image src={item.images?.[0]?.url || item.image || "/assets/placeholder.jpg"} alt={item.name} fill className="object-cover" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-serif text-lg" style={{ color: "var(--text-primary)" }}>{item.name}</h3>
                          {item.selectedVariant && (
                            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Variant: {item.selectedVariant}</p>
                          )}
                          <p className="text-sm mt-1" style={{ color: "var(--color-gold)" }}>Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium" style={{ color: "var(--text-primary)" }}>
                            Rs {(item.salePrice || item.price) * item.quantity}
                          </p>
                          <button onClick={() => removeFromCart(item.cartItemId)} className="text-xs text-red-500 hover:underline mt-1">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: SHIPPING DETAILS */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-luxe p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-serif mb-6 border-b pb-4" style={{ color: "var(--text-primary)", borderColor: "var(--border-light)" }}>
                    Shipping Information
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>Full Name *</label>
                      <input type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} className="input-luxe" placeholder="Enter your full name" required />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>Email Address</label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input-luxe" placeholder="For order updates" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>Phone Number *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className="input-luxe" placeholder="03XX-XXXXXXX" required />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>WhatsApp Number</label>
                      <input type="tel" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} className="input-luxe" placeholder="Optional" />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input-luxe" placeholder="City" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>Full Address *</label>
                      <textarea name="address" value={formData.address} onChange={handleInputChange} rows="3" className="input-luxe resize-none" placeholder="House/Apartment, Street, Area" required />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-sm mb-2" style={{ color: "var(--text-primary)" }}>Order Notes (Optional)</label>
                      <textarea name="notes" value={formData.notes} onChange={handleInputChange} rows="2" className="input-luxe resize-none" placeholder="Any special instructions?" />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="card-luxe p-6 sm:p-8"
                >
                  <h2 className="text-2xl font-serif mb-6 border-b pb-4" style={{ color: "var(--text-primary)", borderColor: "var(--border-light)" }}>
                    Payment Method
                  </h2>
                  <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                    Select a payment method to complete your order. After placing the order, you will be redirected to WhatsApp to send your payment screenshot for confirmation.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {paymentMethods.length === 0 && (
                      <p className="text-sm col-span-2 text-red-500">No payment methods configured. Please contact support.</p>
                    )}
                    {paymentMethods.map((method) => (
                      <label 
                        key={method.methodId} 
                        className="relative flex flex-col p-4 border rounded-xl cursor-pointer transition-all hover:bg-black/5 dark:hover:bg-white/5"
                        style={{ 
                          borderColor: paymentMethod === method.methodId ? "var(--color-gold)" : "var(--border-default)",
                          background: paymentMethod === method.methodId ? "rgba(201,169,110,0.05)" : "var(--bg-card)",
                        }}
                      >
                        <input 
                          type="radio" 
                          name="payment" 
                          value={method.methodId} 
                          checked={paymentMethod === method.methodId}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="absolute opacity-0"
                        />
                        <span className="font-semibold" style={{ color: paymentMethod === method.methodId ? "var(--color-gold)" : "var(--text-primary)" }}>
                          {method.name}
                        </span>
                        {method.bankName && <span className="text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{method.bankName}</span>}
                      </label>
                    ))}
                  </div>

                  {selectedPaymentDetails && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="p-5 rounded-lg border bg-[var(--bg-secondary)]"
                      style={{ borderColor: "var(--border-light)" }}
                    >
                      <h4 className="font-medium mb-3" style={{ color: "var(--text-primary)" }}>Transfer Instructions:</h4>
                      <div className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                        <p>1. Send Rs {cartTotal.toLocaleString()} to the following account:</p>
                        <div className="bg-[var(--bg-primary)] p-3 rounded border flex justify-between items-center" style={{ borderColor: "var(--border-default)" }}>
                          <div>
                            <p className="font-medium" style={{ color: "var(--text-primary)" }}>{selectedPaymentDetails.accountTitle}</p>
                            <p className="font-mono text-lg tracking-wider mt-1" style={{ color: "var(--color-gold)" }}>{selectedPaymentDetails.accountNumber}</p>
                            {selectedPaymentDetails.iban && (
                              <p className="font-mono text-xs mt-1" style={{ color: "var(--text-secondary)" }}>IBAN: {selectedPaymentDetails.iban}</p>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <button onClick={() => copyToClipboard(selectedPaymentDetails.accountNumber)} className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:underline border border-[var(--color-gold)] px-2 py-1 rounded">
                              Copy Acct
                            </button>
                            {selectedPaymentDetails.iban && (
                              <button onClick={() => copyToClipboard(selectedPaymentDetails.iban)} className="text-xs uppercase tracking-wider text-[var(--color-gold)] hover:underline border border-[var(--color-gold)] px-2 py-1 rounded">
                                Copy IBAN
                              </button>
                            )}
                          </div>
                        </div>
                        <p className="mt-2">2. Take a screenshot of the successful transaction.</p>
                        <p>3. Click "Complete Order" below, which will open WhatsApp for you to send the screenshot.</p>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}

            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button onClick={prevStep} className="btn btn-outline flex items-center gap-2">
                  <ArrowLeft size={16} /> Back
                </button>
              ) : <div></div>}
              
              {currentStep < STEPS.length ? (
                <button onClick={nextStep} className="btn btn-gold flex items-center gap-2">
                  Continue <ArrowRight size={16} />
                </button>
              ) : (
                <button 
                  onClick={handlePlaceOrder} 
                  disabled={isSubmitting || !paymentMethod} 
                  className="btn btn-gold flex items-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? "Processing..." : "Complete Order"} <CheckCircle size={16} />
                </button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="card-luxe p-6 sticky top-24">
              <h3 className="text-xl font-serif mb-6" style={{ color: "var(--text-primary)" }}>Summary</h3>
              
              <div className="space-y-4 mb-6 pb-6 border-b" style={{ borderColor: "var(--border-light)" }}>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Subtotal</span>
                  <span style={{ color: "var(--text-primary)" }}>Rs {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span style={{ color: "var(--text-secondary)" }}>Shipping</span>
                  <span style={{ color: "var(--text-primary)" }}>Calculated later</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-sm font-medium uppercase tracking-widest" style={{ color: "var(--text-secondary)" }}>Total</span>
                <span className="text-3xl font-serif font-medium" style={{ color: "var(--color-gold)" }}>Rs {cartTotal.toLocaleString()}</span>
              </div>

              <div className="bg-[var(--bg-secondary)] p-4 rounded-lg text-xs" style={{ color: "var(--text-secondary)" }}>
                <p className="flex items-start gap-2">
                  <span className="mt-0.5"><CheckCircle size={14} style={{ color: "var(--color-gold)" }} /></span>
                  100% Original Pakistani Brands
                </p>
                <p className="flex items-start gap-2 mt-2">
                  <span className="mt-0.5"><CheckCircle size={14} style={{ color: "var(--color-gold)" }} /></span>
                  Premium Unstitched & Stitched Fabrics
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
