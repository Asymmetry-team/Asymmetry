import React, { useState } from "react"
import { useLocation } from "react-router-dom"
import { useLang } from "../../i18n"
import "./langBanner.css"

const PHONE_URL = "tel:+995571141469"
const WHATSAPP_URL = "https://wa.me/995571141469"
// the Google Ads landing page (ads can't point at Georgian, so they open ?lang=en)
const AD_PAGE = "/services/arqiteqturuli-momsakhureba"
const HIDE_KEY = "langBannerHidden"

// drawn as SVG: Windows has no flag emoji (🇬🇪 renders as the letters "GE")
const BOLNUR = "M-1.2-3h2.4v1.8h1.8v2.4h-1.8v1.8h-2.4v-1.8h-1.8v-2.4h1.8z"
const GeorgianFlag = () => (
  <svg className="lang-banner-flag" viewBox="0 0 30 20" aria-hidden="true">
    <rect width="30" height="20" fill="#fff" />
    <path d="M13 0h4v20h-4zM0 8h30v4H0z" fill="#e8112d" />
    {[
      [6.5, 4],
      [23.5, 4],
      [6.5, 16],
      [23.5, 16],
    ].map(([x, y]) => (
      <path key={`${x}-${y}`} d={BOLNUR} transform={`translate(${x} ${y})`} fill="#e8112d" />
    ))}
  </svg>
)

// "View in Georgian" + call / WhatsApp bar on the ad landing page whenever it
// is shown in English — the same for Google and for every visitor — so
// Georgians switch to Georgian with one tap, or call / WhatsApp us straight
// away (tel:/wa.me clicks are tracked by analytics.js).
const LangBanner = () => {
  const { lang, setLang } = useLang()
  const { pathname } = useLocation()
  const [hidden, setHidden] = useState(() => {
    try {
      return sessionStorage.getItem(HIDE_KEY) === "1"
    } catch {
      return false
    }
  })

  const onAdPage = pathname.replace(/\/+$/, "") === AD_PAGE
  if (!onAdPage || lang !== "en" || hidden) return null

  const dropParam = () => {
    try {
      const url = new URL(window.location.href)
      if (!url.searchParams.has("lang")) return
      url.searchParams.delete("lang")
      window.history.replaceState(window.history.state, "", url.pathname + url.search + url.hash)
    } catch {}
  }

  const toKa = () => {
    setLang("ka")
    dropParam()
  }

  // × hides the bar for the rest of this visit (tab session)
  const close = () => {
    try {
      sessionStorage.setItem(HIDE_KEY, "1")
    } catch {}
    setHidden(true)
  }

  return (
    <div className="lang-banner" role="region" aria-label="Language" lang="ka">
      <button type="button" className="lang-banner-go" onClick={toKa}>
        <GeorgianFlag />
        <span>საიტის ქართული ვერსია</span>
        <span className="lang-banner-arrow" aria-hidden="true">→</span>
      </button>
      <div className="lang-banner-actions">
        <a className="lang-banner-btn" href={PHONE_URL}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" />
          </svg>
          <span>დარეკვა 571 14 14 69</span>
        </a>
        <a className="lang-banner-btn lang-banner-btn--wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.25-.12-1.47-.72-1.7-.8-.23-.09-.4-.13-.56.12-.17.25-.64.8-.79.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-3.32-2.9c-.25-.43.25-.4.72-1.33.08-.16.04-.3-.02-.43l-.76-1.83c-.2-.48-.4-.41-.56-.42h-.48a.92.92 0 0 0-.66.31 2.8 2.8 0 0 0-.87 2.07 4.85 4.85 0 0 0 1.02 2.58 11.1 11.1 0 0 0 4.25 3.76c1.58.68 2.2.74 2.99.62.48-.07 1.47-.6 1.68-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.17-.48-.29z" />
          </svg>
          <span>WhatsApp</span>
        </a>
      </div>
      <button type="button" className="lang-banner-x" onClick={close} aria-label="Close">
        ×
      </button>
    </div>
  )
}

export default LangBanner
