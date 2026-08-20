import React, { useEffect, useState } from "react"
import { Icon } from "@iconify/react"
import "./themeToggle.css"

// The site ALWAYS starts in light mode on every load (the choice is not
// persisted across reloads). Toggling only affects the current session.
const ThemeToggle = () => {
  const [theme, setTheme] = useState("light")

  useEffect(() => {
    setTheme("light")
    document.documentElement.setAttribute("data-theme", "light")
    try {
      localStorage.removeItem("theme")
    } catch {}
  }, [])

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark"
    setTheme(next)
    document.documentElement.setAttribute("data-theme", next)
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
