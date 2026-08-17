import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import { featured } from "../../data/Data"

const FeaturedCard = () => {
  const [openIdx, setOpenIdx] = useState(null)
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
      cards.forEach((c) => c.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.15) e.target.classList.add("in")
          else if (e.intersectionRatio === 0) e.target.classList.remove("in")
        }),
      { threshold: [0, 0.15] }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <div className='content grid4 mtop' ref={gridRef}>
        {featured.map((items, index) => (
          <div
            className={`box reveal-card ${openIdx === index ? "open" : ""} ${
              items.details ? "has-details" : ""
            }`}
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
