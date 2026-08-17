import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { featured } from "../../data/Data"

const FeaturedCard = () => {
  const [openIdx, setOpenIdx] = useState(null)
  // Reveal state kept in React (a Set of in-view indices) rather than a class
  // toggled straight on the DOM. If it lived only as a manually-added `.in`
  // class, React would wipe it every time a card's className re-renders (e.g.
  // when `open` toggles), leaving the tapped card stuck at opacity 0 — a blank
  // white box. Keeping it in state means it survives those re-renders.
  const [inView, setInView] = useState({})
  const gridRef = useRef(null)

  // Same smooth fade-up reveal as the project cards: each card animates in when
  // it scrolls into view and replays after it fully scrolls out.
  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return
    const cards = el.querySelectorAll(".reveal-card")
    if (typeof IntersectionObserver === "undefined") {
      const all = {}
      cards.forEach((c) => (all[c.dataset.idx] = true))
      setInView(all)
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          const idx = e.target.dataset.idx
          if (e.intersectionRatio >= 0.15)
            setInView((v) => (v[idx] ? v : { ...v, [idx]: true }))
          else if (e.intersectionRatio === 0)
            setInView((v) => (v[idx] ? { ...v, [idx]: false } : v))
        }),
      { threshold: [0, 0.15] }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  // Mobile accordion height: set each service popup's max-height to its exact
  // content height when open (0 when closed) so the expand/collapse animates to
  // the real height — no fixed-max "dead-time" that left cards looking unevenly
  // spaced mid-collapse. Desktop uses the floating hover popup, so clear the
  // inline max-height there and let the CSS govern.
  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return
    const apply = () => {
      const el = gridRef.current
      if (!el) return
      const isMobile = window.matchMedia("(max-width: 700px)").matches
      el.querySelectorAll(".box").forEach((box, i) => {
        const popup = box.querySelector(".service-popup")
        if (!popup) return
        if (!isMobile) {
          popup.style.maxHeight = ""
          return
        }
        popup.style.maxHeight = (openIdx === i ? popup.scrollHeight : 0) + "px"
      })
    }
    apply()
    window.addEventListener("resize", apply)
    return () => window.removeEventListener("resize", apply)
  }, [openIdx])

  return (
    <>
      <div className='content grid4 mtop' ref={gridRef}>
        {featured.map((items, index) => (
          <div
            className={`box reveal-card ${inView[index] ? "in" : ""} ${
              openIdx === index ? "open" : ""
            } ${items.details ? "has-details" : ""}`}
            data-idx={index}
            key={index}
            onClick={() =>
              items.details && setOpenIdx(openIdx === index ? null : index)
            }
          >
            {items.details && (
              <span className='service-badge'>
                <Icon icon='mdi:plus' className='badge-plus' />
                <Icon icon='mdi:chevron-down' className='badge-chevron' />
              </span>
            )}
            {items.iconify ? (
              <Icon icon={items.iconify} className='featured-iconify' />
            ) : (
              <img src={items.cover} alt={`Asymmetry — ${items.name}`} />
            )}
            <h4>{items.name}</h4>
            <label>{items.total}</label>

            {items.details && (
              <div className='service-popup'>
                <ul>
                  {items.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
