"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Package, Truck, CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { trackOrder } from "@/lib/api";
import { WHATSAPP_NUMBER } from "@/lib/constants";
import Link from "next/link";

const STATUS_STEPS = [
  { key: "pending", label: "Order Placed", desc: "Your order is logged and awaiting confirmation" },
  { key: "processing", label: "Processing", desc: "Fabric is being packed or stitched" },
  { key: "paid", label: "Confirmed / Paid", desc: "Payment verified, parcel preparing for courier dispatch" },
  { key: "shipped", label: "Dispatched", desc: "Handed over to courier with tracking number" },
  { key: "delivered", label: "Delivered", desc: "Successfully delivered to your doorstep" }
];

export default function TrackOrderClient() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState(null);

  const handleTrack = async (e) => {
    e.preventDefault();
    if (!orderId.trim() && !phone.trim()) {
      setError("Please enter your Order ID or Phone Number.");
      return;
    }

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await trackOrder({
        orderId: orderId.trim() || undefined,
        phone: phone.trim() || undefined
      });
      setOrder(res.data);
    } catch (err) {
      setError(err.message || "No order found. Please verify your Order ID or phone number.");
    } finally {
      setLoading(false);
    }
  };

  const getStepIndex = (status) => {
    if (status === "cancelled") return -1;
    const idx = STATUS_STEPS.findIndex((s) => s.key === status);
    return idx >= 0 ? idx : 0;
  };

  const currentStepIdx = order ? getStepIndex(order.status) : 0;

  return (
    <div className="section-spacer bg-[var(--bg-primary)] min-h-[85vh]">
      <div className="container-luxe max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs uppercase tracking-[0.3em] mb-2 font-medium" style={{ color: "var(--color-gold)" }}>
            Real-Time Shipment Status
          </p>
          <h1 className="text-4xl sm:text-5xl font-serif mb-4" style={{ color: "var(--text-primary)" }}>
            Track Your Order
          </h1>
          <p className="text-sm max-w-md mx-auto" style={{ color: "var(--text-secondary)" }}>
            Enter your Order ID or the mobile phone number used during checkout to view real-time delivery status.
          </p>
        </div>

        {/* Tracking Search Card */}
        <div className="card-luxe p-6 sm:p-8 mb-8">
          <form onSubmit={handleTrack} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-primary)" }}>
                  Order ID (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 66a1... or Order Number"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="input-luxe"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-primary)" }}>
                  Phone Number
                </label>
                <input
                  type="text"
                  placeholder="e.g. 03001234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="input-luxe"
                />
              </div>
            </div>

            {error && (
              <div className="p-3.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2 border border-rose-200 dark:border-rose-900">
                <AlertCircle size={16} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-gold w-full flex items-center justify-center gap-2 py-4 tracking-wider uppercase text-sm font-semibold disabled:opacity-50"
            >
              <Search size={16} />
              {loading ? "Searching Tracking..." : "Track My Parcel"}
            </button>
          </form>
        </div>

        {/* Order Details & Stepper */}
        {order && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Summary Card */}
            <div className="card-luxe p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b" style={{ borderColor: "var(--border-light)" }}>
                <div>
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Order Number
                  </span>
                  <h3 className="font-mono text-xl font-bold mt-0.5" style={{ color: "var(--color-gold)" }}>
                    #{order.orderId ? String(order.orderId).slice(-8).toUpperCase() : ""}
                  </h3>
                </div>

                <div className="text-right">
                  <span className="text-xs uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
                    Status
                  </span>
                  <p className="font-serif text-lg font-bold capitalize mt-0.5" style={{ color: "var(--text-primary)" }}>
                    {order.status}
                  </p>
                </div>
              </div>

              {/* Courier Tracking Highlight Banner */}
              {order.courierDetails?.trackingNumber && (
                <div className="mt-6 p-4 rounded-xl border bg-amber-500/10 border-amber-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-[var(--color-gold)] text-white">
                      <Truck size={20} />
                    </span>
                    <div>
                      <p className="text-xs text-amber-800 dark:text-amber-300 font-semibold uppercase tracking-wider">
                        {order.courierDetails.courierName || "Courier"} Tracking ID
                      </p>
                      <p className="font-mono text-base font-bold" style={{ color: "var(--text-primary)" }}>
                        {order.courierDetails.trackingNumber}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Salam Zasha's! I am inquiring about my dispatched order #${String(order.orderId).slice(-6).toUpperCase()} tracking ${order.courierDetails.trackingNumber}.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp text-xs py-2 px-3 self-start sm:self-auto"
                  >
                    Courier Support on WhatsApp
                  </a>
                </div>
              )}

              {/* Progress Stepper */}
              <div className="mt-8 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: "var(--text-secondary)" }}>
                  Delivery Progress
                </h4>

                <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-[var(--border-default)]">
                  {STATUS_STEPS.map((step, idx) => {
                    const isDone = currentStepIdx >= idx;
                    const isCurrent = currentStepIdx === idx;

                    return (
                      <div key={step.key} className="flex items-start gap-4 relative">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 z-10 transition-colors ${
                            isDone ? "bg-[var(--color-gold)] text-white" : "bg-[var(--bg-secondary)] border border-[var(--border-default)] text-[var(--text-secondary)]"
                          }`}
                        >
                          {isDone ? <CheckCircle2 size={15} /> : <span className="text-[10px] font-bold">{idx + 1}</span>}
                        </div>
                        <div>
                          <p className={`font-semibold text-sm ${isCurrent ? "text-[var(--color-gold)] font-serif text-base" : "text-[var(--text-primary)]"}`}>
                            {step.label}
                          </p>
                          <p className="text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Items in Order */}
              <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border-light)" }}>
                <h4 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: "var(--text-secondary)" }}>
                  Parcel Contents ({order.items?.length || 0} items)
                </h4>
                <div className="divide-y divide-[var(--border-light)]">
                  {order.items?.map((it, i) => (
                    <div key={i} className="py-3 flex items-center justify-between text-xs">
                      <div>
                        <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{it.title}</p>
                        {it.selectedVariant && (
                          <span className="text-[11px]" style={{ color: "var(--text-secondary)" }}>Variant: {it.selectedVariant}</span>
                        )}
                      </div>
                      <div className="text-right">
                        <p style={{ color: "var(--text-secondary)" }}>Qty: {it.quantity}</p>
                        <p className="font-bold font-mono mt-0.5" style={{ color: "var(--color-gold)" }}>
                          Rs {(it.price * it.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4 mt-2 border-t flex justify-between items-center text-sm font-bold" style={{ borderColor: "var(--border-light)" }}>
                  <span style={{ color: "var(--text-primary)" }}>Total Payable / Paid:</span>
                  <span className="font-serif text-lg text-[var(--color-gold)]">
                    Rs {Number(order.totalAmount || 0).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Need Assistance Card */}
            <div className="p-4 rounded-xl border bg-[var(--bg-secondary)] flex items-center justify-between" style={{ borderColor: "var(--border-light)" }}>
              <div className="text-xs">
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>Need help with your parcel?</p>
                <p style={{ color: "var(--text-secondary)" }}>Our customer concierge is available on WhatsApp daily.</p>
              </div>
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline text-xs py-2 px-3 flex items-center gap-1.5"
              >
                Contact Concierge &rarr;
              </a>
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
