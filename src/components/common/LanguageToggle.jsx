import React from "react"
import { useLang } from "../../i18n"
import "./languageToggle.css"

// KA / EN switch. Clicking flips the language.
const LanguageToggle = () => {
  const { lang, setLang } = useLang()
  return (
    <button
      className="lang-toggle"
      onClick={() => setLang(lang === "ka" ? "en" : "ka")}
      aria-label={lang === "ka" ? "Switch to English" : "ქართულად გადართვა"}
    >
      <span className={lang === "ka" ? "on" : ""}>ge</span>
      <span className={lang === "en" ? "on" : ""}>EN</span>
    </button>
  )
}

export default LanguageToggle
