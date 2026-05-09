import Link from "next/link";
import Image from "next/image";
import { BRAND_NAME, NAV_LINKS, SOCIAL_LINKS, EMAIL, WHATSAPP_NUMBER } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--footer-bg)",
        color: "var(--footer-text)",
      }}
    >
      {/* Gold accent border */}
      <div
        style={{
          height: 3,
          background: "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
        }}
      />

      {/* Top section */}
      <div className="container-luxe" style={{ padding: "64px 24px" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image
                src="/assets/favicon.png"
                alt={BRAND_NAME}
                width={36}
                height={36}
                className="rounded-md"
                style={{ objectFit: "contain", width: "auto", height: "36px" }}
              />
              <h3
                className="text-2xl"
                style={{
                  fontFamily: "var(--font-cormorant), serif",
                  color: "var(--color-gold-light)",
                  fontWeight: 600,
                }}
              >
                {BRAND_NAME}
              </h3>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "#9a9590", maxWidth: 300 }}
            >
              Redefining Pakistani fashion with premium fabrics and timeless
              elegance. Every piece tells a story of luxury and tradition.
            </p>
            {/* Social icons */}
            <div className="flex gap-4">
              <SocialIcon
                href={SOCIAL_LINKS.instagram}
                label="Instagram"
                icon={instagramSvg}
              />
              <SocialIcon
                href={SOCIAL_LINKS.facebook}
                label="Facebook"
                icon={facebookSvg}
              />
              <SocialIcon
                href={SOCIAL_LINKS.whatsapp}
                label="WhatsApp"
                icon={whatsappSvg}
              />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-sm font-semibold tracking-widest uppercase mb-5"
              style={{ color: "var(--color-gold-light)" }}
            >
              Quick Links
            </h4>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm transition-colors hover:text-[var(--color-gold)]"
                    style={{ color: "#9a9590" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-semibold tracking-widest uppercase mb-5"
              style={{ color: "var(--color-gold-light)" }}
            >
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm" style={{ color: "#9a9590" }}>
              <li>Email: {EMAIL}</li>
              <li>WhatsApp: +{WHATSAPP_NUMBER}</li>
              <li>Lahore, Pakistan</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="py-6"
        style={{ borderTop: "1px solid rgba(201,169,110,0.1)" }}
      >
        <div className="container-luxe flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "#6a6560" }}>
            &copy; {currentYear} {BRAND_NAME}. All rights reserved.
          </p>
          <p className="text-xs" style={{ color: "#6a6560" }}>
            Crafted with ♥ in Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ── Social icon helper ──────────────────────────────── */
function SocialIcon({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-9 h-9 rounded-full flex items-center justify-center transition-all hover:border-[var(--color-gold)]"
      style={{
        border: "1px solid rgba(201,169,110,0.2)",
        color: "var(--color-gold-light)",
      }}
    >
      <span dangerouslySetInnerHTML={{ __html: icon }} />
    </a>
  );
}

const instagramSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5"/></svg>`;
const facebookSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>`;
const whatsappSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.12.553 4.113 1.519 5.845L.05 23.308a.5.5 0 00.642.642l5.463-1.469A11.948 11.948 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22a9.94 9.94 0 01-5.39-1.582l-.386-.235-3.248.873.873-3.248-.235-.386A9.94 9.94 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/></svg>`;
