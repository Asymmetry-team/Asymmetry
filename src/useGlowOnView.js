import { useEffect } from "react"

// "Our work" glows each time it scrolls into view and pulses only on its first
// appearance (aq-pulsed turns the pulse off). The calculator only reacts to clicks.
export const useGlowOnView = (dep) => {
  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return undefined
    const els = document.querySelectorAll(".aq-proj-sec")
    if (!els.length) return undefined
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const was = e.target.classList.contains("aq-glow-now")
          e.target.classList.toggle("aq-glow-now", e.isIntersecting)
          if (was && !e.isIntersecting) {
            e.target.classList.add("aq-pulsed")
          }
        }),
      { threshold: 0.4 }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [dep])
}
