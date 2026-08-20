import React, { createContext, useContext, useEffect, useState } from "react"
import { KA_EN } from "./translations"

// Lightweight i18n: a Georgian (default) / English dictionary + a t() helper.
// Language is stored in localStorage and applied as <html lang="…">.
const dict = {
  ka: {
    // nav
    "nav/": "მთავარი",
    "nav/about": "ჩვენ შესახებ",
    "nav/services": "სერვისები",
    "nav/blog": "ბლოგი",
    "nav/projects": "პროექტები",
    "nav/contact": "კონტაქტი",
    // header
    "header.tagline": "არქიტექტურული სტუდია -",
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
    "nav/services": "Services",
    "nav/blog": "Blog",
    "nav/projects": "Projects",
    "nav/contact": "Contact",
    "header.tagline": "Architecture studio -",
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

  // Always start in Georgian on every load (not persisted across reloads).
  useEffect(() => {
    setLangState("ka")
    document.documentElement.setAttribute("lang", "ka")
    try {
      localStorage.removeItem("lang")
    } catch {}
  }, [])

  const setLang = (l) => {
    setLangState(l)
    document.documentElement.setAttribute("lang", l)
  }

  const t = (key, fallback) => (dict[lang] && dict[lang][key]) || fallback || key

  // translate a raw Georgian data string to English (when lang === "en")
  const tr = (str) => {
    if (lang !== "en" || str == null) return str
    const key = typeof str === "string" ? str.trim() : str
    return KA_EN[key] || str
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, tr }}>
      {children}
    </LangContext.Provider>
  )
}

export const useLang = () => useContext(LangContext)
