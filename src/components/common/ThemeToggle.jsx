import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import "./themeToggle.css"

// The theme choice PERSISTS across reloads: it's saved in localStorage and
// re-applied on load (an inline script in index.html sets data-theme before
// first paint to avoid a flash; this just syncs React state to it). Default
// is light when nothing was saved.
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    let saved = "light"
    try {
      const stored = localStorage.getItem("theme")
      if (stored === "dark" || stored === "light") saved = stored
    } catch {}
    setTheme(saved)
    document.documentElement.setAttribute("data-theme", saved)
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return (
    <button
      className={`theme-toggle ${theme === "dark" ? "is-dark" : ""}`}
      onClick={toggle}
      aria-label={theme === "dark" ? "ღია რეჟიმი" : "მუქი რეჟიმი"}
      title={theme === "dark" ? "ღია რეჟიმი" : "მუქი რეჟიმი"}
    >
      <span className="tt-track">
        <span className="tt-thumb">
          <Icon icon={theme === "dark" ? "mdi:weather-night" : "mdi:white-balance-sunny"} />
        </span>
      </span>
    </button>
  )
}

export default ThemeToggle
