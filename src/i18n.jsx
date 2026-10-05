import React, { createContext, useContext, useEffect, useState } from "react"
import { KA_EN } from "./translations"

// Lightweight i18n: a Georgian (default) / English dictionary + a t() helper.
// Language is stored in localStorage and applied as <html lang="…">.
const dict = {
  ka: {
    // nav
    "nav/": "მთავარი",
    "nav/about": "ჩვენ შესახებ",
    "nav/content": "კონტენტი",
    "nav/services": "სერვისები",
    "nav/blog": "ბლოგი",
    "nav/projects": "პროექტები",
    "nav/contact": "კონტაქტი",
    // header
    "header.tagline": "არქიტექტურული კომპანია -",
    "header.brand": "ასიმეტრია",
    // home section headings
    "home.services": "სერვისები",
    "home.process": "როგორ ვმუშაობთ",
    "home.projects": "დასრულებული პროექტები",
    "home.blog": "ბლოგი",
    "home.reviews": "შეფასებები",
    "home.faq": "ხშირი კითხვები",
    "home.partners": "პარტნიორები",
    "svc.arch": "არქიტექტურული მომსახურება",
    "svc.other": "სხვადასხვა მომსახურება",
    // common
    "more": "ვრცლად →",
    "detail": "დეტალურად ნახვა →",
  },
  en: {
    "nav/": "Home",
    "nav/about": "About",
    "nav/content": "Content",
    "nav/services": "Services",
    "nav/blog": "Blog",
    "nav/projects": "Projects",
    "nav/contact": "Contact",
    "header.tagline": "Architecture company -",
    "header.brand": "Asymmetry",
    "home.services": "Services",
    "home.process": "How We Work",
    "home.projects": "Completed Projects",
    "home.blog": "Blog",
    "home.reviews": "Reviews",
    "home.faq": "FAQ",
    "home.partners": "Partners",
    "svc.arch": "Architectural Services",
    "svc.other": "Other Services",
    "more": "Read more →",
    "detail": "View details →",
  },
}

const LangContext = createContext({
  lang: "ka",
  setLang: () => {},
  t: (k) => k,
  tr: (s) => s,
})

export const LangProvider = ({ children }) => {
  const [lang, setLangState] = useState("ka")

  // The FIRST render is always Georgian: that is what the pre-rendered HTML
  // contains (and what Google indexes), so hydration matches. Right after mount
  // we switch to the visitor's saved language (localStorage), or to ?lang=en /
  // ?lang=ka when present (used by scripts/i18n-audit.mjs and shareable links).
  useEffect(() => {
    let l = "ka"
    try {
      const q = new URLSearchParams(window.location.search).get("lang")
      if (q === "en" || q === "ka") l = q
      else if (localStorage.getItem("lang") === "en") l = "en"
    } catch {}
    setLangState(l)
    document.documentElement.setAttribute("lang", l)
  }, [])

  const setLang = (l) => {
    setLangState(l)
    document.documentElement.setAttribute("lang", l)
    try {
      localStorage.setItem("lang", l)
    } catch {}
  }

  const t = (key, fallback) => (dict[lang] && dict[lang][key]) || fallback || key

  // translate a raw Georgian data string to English (when lang === "en")
  const tr = (str) => {
    if (lang !== "en" || str == null) return str
    const key = typeof str === "string" ? str.trim() : str
    if (KA_EN[key]) return KA_EN[key]
    // no dictionary entry: still convert units in data strings like
    // "380 მ²", "0–60 კვ.მ" or "2021 წელი" (cards, specs)
    if (typeof str === "string") {
      return str
        .replace(/კვ\.?\s?მ\.?/g, "m²")
        .replace(/მ²/g, "m²")
        .replace(/(\d)\s*მ(?![²\u10A0-\u10FF])/g, "$1 m") // metres
        .replace(/(\d{4})\s*წელი/g, "$1")
    }
    return str
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
