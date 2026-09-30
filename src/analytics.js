// Google Analytics 4 + conversion (key event) tracking.
//
// Paste the GA4 Measurement ID ("G-XXXXXXXXXX") below. While it is empty,
// nothing is loaded and track() is a no-op, so the site works unchanged.
//
// Events sent (mark them as Key events in GA → Admin → Key events):
//   phone_click      — any tel: link / "call" button
//   whatsapp_click   — any WhatsApp link / button
//   messenger_click  — any Messenger link / button
//   email_click      — any mailto: link
//   generate_lead    — a filled-in form (contact form or price calculator)
//                      actually sent to WhatsApp / Messenger
//                      params: form = "contact_form" | "price_form", channel
// Page views (incl. SPA route changes) come from GA4 enhanced measurement.
export const GA_ID = "G-4BJKZG2SKM"

// the pre-render crawl must not bake the gtag <script> into the static HTML
const isPrerender = () =>
  typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap"

export const track = (name, params = {}) => {
  if (!GA_ID || typeof window === "undefined" || !window.gtag) return
  window.gtag("event", name, { page_path: window.location.pathname, ...params })
}

// classify a clicked link into a conversion event (or null)
const linkEvent = (href) => {
  if (!href) return null
  if (href.startsWith("tel:")) return "phone_click"
  if (href.startsWith("mailto:")) return "email_click"
  if (/wa\.me|whatsapp\.com/.test(href)) return "whatsapp_click"
  if (/m\.me\/|messenger\.com/.test(href)) return "messenger_click"
  return null
}

export const initAnalytics = () => {
  if (!GA_ID || typeof window === "undefined" || isPrerender() || window.gtag) return

  const s = document.createElement("script")
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
  document.head.appendChild(s)

  window.dataLayer = window.dataLayer || []
  window.gtag = function gtag() {
    window.dataLayer.push(arguments)
  }
  window.gtag("js", new Date())
  window.gtag("config", GA_ID)

  // one delegated listener covers every tel:/mailto:/WhatsApp/Messenger link
  // on the site (header, footer, landings, blog, contact chooser…)
  document.addEventListener(
    "click",
    (e) => {
      const a = e.target.closest && e.target.closest("a[href]")
      if (!a) return
      const name = linkEvent(a.getAttribute("href"))
      if (name) track(name, { link_url: a.href, link_text: (a.textContent || "").trim().slice(0, 60) })
    },
    { capture: true }
  )
}
