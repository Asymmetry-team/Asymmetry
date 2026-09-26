import { useEffect } from "react"

// One-card-per-swipe for the horizontal card carousels, without the "glitch"
// that native momentum + scrollTo cause. On touch we drive the scroll manually
// (finger-tracked, no inertia), then smooth-snap to exactly ONE card on release.
// scroll-snap is disabled during the gesture so it never fights the drag.
export function useCardSwipe(trackRef, deps = []) {
  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const GAP = 24
    let startX = 0
    let startY = 0
    let startScroll = 0
    let dragging = false
    let horizontal = null

    const step = () => {
      const c = el.querySelector(".blog-carousel-card")
      return c ? c.getBoundingClientRect().width + GAP : el.clientWidth
    }

    const onStart = (e) => {
      const t = e.touches[0]
      startX = t.clientX
      startY = t.clientY
      startScroll = el.scrollLeft
      dragging = true
      horizontal = null
      el.style.scrollSnapType = "none"
    }
    const onMove = (e) => {
      if (!dragging) return
      const t = e.touches[0]
      const dx = t.clientX - startX
      const dy = t.clientY - startY
      if (horizontal === null) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return
        horizontal = Math.abs(dx) > Math.abs(dy)
      }
      if (horizontal) {
        e.preventDefault() // take over from native scroll → no momentum, no glitch
        el.scrollLeft = startScroll - dx
      }
    }
    const onEnd = (e) => {
      if (!dragging) return
      dragging = false
      if (!horizontal) {
        el.style.scrollSnapType = ""
        return
      }
      const dx = (e.changedTouches[0] ? e.changedTouches[0].clientX : startX) - startX
      const s = step()
      const base = Math.round(startScroll / s)
      let idx = base
      if (Math.abs(dx) > 40) idx = base + (dx < 0 ? 1 : -1)
      const max = el.scrollWidth - el.clientWidth
      el.scrollTo({
        left: Math.max(0, Math.min(max, idx * s)),
        behavior: "smooth",
      })
      // restore CSS snapping once the smooth scroll has settled
      setTimeout(() => {
        el.style.scrollSnapType = ""
      }, 450)
    }

    el.addEventListener("touchstart", onStart, { passive: true })
    el.addEventListener("touchmove", onMove, { passive: false })
    el.addEventListener("touchend", onEnd, { passive: true })
    return () => {
      el.removeEventListener("touchstart", onStart)
      el.removeEventListener("touchmove", onMove)
      el.removeEventListener("touchend", onEnd)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
