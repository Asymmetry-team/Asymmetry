import React, { useEffect, useState } from "react"
import { useLang } from "../../i18n"
import "./langBanner.css"

// Google Ads can't send visitors to a Georgian page (Georgian is an
// "Unsupported language"), so the ads land on ?lang=en. This bar — shown to
// every visitor of a ?lang=en link, the same for Google and for people — lets
// Georgians switch to the Georgian site with one tap.
const LangBanner = () => {
  const { lang, setLang } = useLang()
  const [fromLink, setFromLink] = useState(false)

  useEffect(() => {
    try {
      setFromLink(new URLSearchParams(window.location.search).get("lang") === "en")
    } catch {}
  }, [])

  if (!fromLink || lang !== "en") return null

  const dropParam = () => {
    try {
      const url = new URL(window.location.href)
      url.searchParams.delete("lang")
      window.history.replaceState(null, "", url.pathname + url.search + url.hash)
    } catch {}
    setFromLink(false)
  }

  const toKa = () => {
    setLang("ka")
    dropParam()
  }

  return (
    <div className="lang-banner" role="region" aria-label="Language">
      <button type="button" className="lang-banner-go" onClick={toKa} lang="ka">
        <span className="lang-banner-flag" aria-hidden="true">🇬🇪</span>
        <span>საიტის ქართულად ნახვა</span>
        <span className="lang-banner-arrow" aria-hidden="true">→</span>
      </button>
      <button type="button" className="lang-banner-x" onClick={dropParam} aria-label="Close">
        ×
      </button>
    </div>
  )
}

export default LangBanner
