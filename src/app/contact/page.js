"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WHATSAPP_NUMBER, SOCIAL_LINKS, BRAND_NAME } from "@/lib/constants";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
};

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi ${BRAND_NAME}!\n\nName: ${form.name}\nEmail: ${form.email}\n\nMessage: ${form.message}`;
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank"
    );
    setSubmitted(true);
  };

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex items-center justify-center text-center overflow-hidden"
        style={{ minHeight: 400, background: "var(--hero-bg)" }}
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "radial-gradient(circle, rgba(201,169,110,0.05) 0%, transparent 60%)" }} />
        </div>

        <div className="container-luxe py-24 relative z-10">
          <motion.p
            className="text-xs tracking-[0.35em] uppercase mb-5"
            style={{ color: "var(--color-gold-dark)" }}
            {...fadeUp}
          >
            Get in Touch
          </motion.p>
          <motion.h1
            className="text-4xl lg:text-6xl mb-5"
            style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500, lineHeight: 1.1 }}
            {...fadeUp}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="text-base mx-auto"
            style={{ color: "var(--text-secondary)", maxWidth: 460 }}
            {...fadeUp}
          >
            We&apos;d love to hear from you. Reach out for inquiries, orders,
            or just to say hello.
          </motion.p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section-spacer" style={{ background: "var(--bg-primary)" }}>
        <div className="container-luxe">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-14">
            {/* Contact Info */}
            <div className="space-y-5">
              {[
                { icon: "✉", title: "Email", detail: "info@zashascollection.com", href: "mailto:info@zashascollection.com" },
                { icon: "📱", title: "WhatsApp", detail: "+92 300 0000000", href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { icon: "📍", title: "Location", detail: "Lahore, Pakistan", href: null },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="group p-6 rounded-xl flex items-start gap-5 transition-all duration-500 hover:shadow-lg cursor-default"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                  }}
                  initial={{ opacity: 0, x: -24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <span className="text-2xl shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300"
                    style={{ color: "var(--color-gold)" }}>
                    {item.icon}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-1.5"
                      style={{ color: "var(--text-primary)" }}>
                      {item.title}
                    </h4>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noopener noreferrer"
                        className="text-sm hover:text-[var(--color-gold)] transition-colors duration-300"
                        style={{ color: "var(--text-secondary)" }}>
                        {item.detail}
                      </a>
                    ) : (
                      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                        {item.detail}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social */}
              <motion.div
                className="p-6 rounded-xl"
                style={{ background: "var(--bg-card)", border: "1px solid var(--border-light)" }}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4 className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
                  style={{ color: "var(--text-primary)" }}>
                  Follow Us
                </h4>
                <div className="flex gap-4">
                  {[
                    { label: "Instagram", href: SOCIAL_LINKS.instagram },
                    { label: "Facebook", href: SOCIAL_LINKS.facebook },
                  ].map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                      className="text-sm px-4 py-2 rounded-md transition-all duration-300 hover:bg-[rgba(201,169,110,0.08)] hover:text-[var(--color-gold)]"
                      style={{ color: "var(--text-secondary)", border: "1px solid var(--border-light)" }}>
                      {s.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <motion.div {...fadeUp}>
              {submitted ? (
                <motion.div
                  className="rounded-2xl p-12 text-center flex flex-col items-center justify-center"
                  style={{
                    minHeight: 440,
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                  }}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20 }}
                >
                  <motion.span
                    className="text-5xl mb-6"
                    style={{ color: "var(--color-gold)" }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    ✓
                  </motion.span>
                  <h3 className="text-3xl mb-3"
                    style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 500 }}>
                    Message Sent!
                  </h3>
                  <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
                    We&apos;ll get back to you shortly on WhatsApp.
                  </p>
                  <button className="btn btn-outline text-xs" onClick={() => setSubmitted(false)}>
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="rounded-2xl p-8 lg:p-10 space-y-6"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-light)",
                  }}
                >
                  <div>
                    <h3 className="text-2xl mb-2"
                      style={{ fontFamily: "var(--font-cormorant), serif", fontWeight: 600 }}>
                      Send a Message
                    </h3>
                    <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                      Fill out the form and we&apos;ll respond via WhatsApp.
                    </p>
                  </div>

                  <div className="space-y-5">
                    {[
                      { label: "Name", type: "text", key: "name", id: "contact-name" },
                      { label: "Email", type: "email", key: "email", id: "contact-email" },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="block text-[10px] tracking-[0.2em] uppercase mb-2.5 font-medium"
                          style={{ color: "var(--text-secondary)" }}>
                          {field.label}
                        </label>
                        <input
                          type={field.type}
                          required
                          value={form[field.key]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="input-luxe"
                          id={field.id}
                        />
                      </div>
                    ))}
                    <div>
                      <label className="block text-[10px] tracking-[0.2em] uppercase mb-2.5 font-medium"
                        style={{ color: "var(--text-secondary)" }}>
                        Message
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="input-luxe resize-none"
                        id="contact-message"
                      />
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary w-full">
                    Send via WhatsApp
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
