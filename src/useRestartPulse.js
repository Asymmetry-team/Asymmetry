import { useEffect, useRef } from "react"
import { useLocation } from "react-router-dom"

// The floating buttons stay mounted across pages, so their CSS heartbeat runs
// only once. Rewind it on every route change (the pop-in does not replay).
export const useRestartPulse = () => {
  const ref = useRef(null)
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    if (!ref.current || !ref.current.getAnimations) return
    ref.current
      .getAnimations()
      .filter((a) => a.animationName === "msgr-pulse")
      .forEach((a) => {
        a.currentTime = 0
        a.play()
      })
  }, [pathname])
  return ref
}
