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
    "nav/services/arqiteqturuli-momsakhureba": "არქიტექტურული მომსახურება",
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
    "nav/services/arqiteqturuli-momsakhureba": "Architectural services",
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

// English pages live under /en/… (pre-rendered in English, so crawlers — Bing /
// ChatGPT, Google — can index them). The rest of the site is Georgian.
export const isEnPath = () =>
  typeof window !== "undefined" && /^\/en(\/|$)/.test(window.location.pathname)

// the same page in the other language: /en/x ↔ /x
export const altLangPath = (pathname, to) => {
  const bare = pathname.replace(/^\/en(?=\/|$)/, "") || "/"
  return to === "en" ? (bare === "/" ? "/en/" : `/en${bare}`) : bare
}

export const LangProvider = ({ children }) => {
  // /en/… pages render English from the very first render (that is what their
  // pre-rendered HTML contains, so hydration matches)
  const [lang, setLangState] = useState(() => (isEnPath() ? "en" : "ka"))

  // On Georgian URLs the FIRST render is always Georgian: that is what the
  // pre-rendered HTML contains (and what Google indexes), so hydration matches.
  // Right after mount we switch to the visitor's saved language (localStorage),
  // or to ?lang=en / ?lang=ka when present (ad landing links, i18n audit).
  useEffect(() => {
    if (isEnPath()) {
      document.documentElement.setAttribute("lang", "en")
      return
    }
    let l = "ka"
    try {
      const q = new URLSearchParams(window.location.search).get("lang")
      const saved = localStorage.getItem("lang")
      // a visitor who already picked Georgian (e.g. via the ad landing bar,
      // LangBanner) keeps Georgian even when they come back on a ?lang=en link
      if (q === "en" && saved === "ka") l = "ka"
      else if (q === "en" || q === "ka") l = q
      else if (saved === "en") l = "en"
    } catch {}
    setLangState(l)
    document.documentElement.setAttribute("lang", l)
  }, [])

  const setLang = (l) => {
    // leaving an /en/… page for Georgian → go to the Georgian URL of the page
    if (l === "ka" && isEnPath()) {
      try {
        localStorage.setItem("lang", "ka")
      } catch {}
      const { pathname, search, hash } = window.location
      window.location.assign(altLangPath(pathname, "ka") + search + hash)
      return
    }
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
