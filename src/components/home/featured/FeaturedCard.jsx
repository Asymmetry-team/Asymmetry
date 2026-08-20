import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { featured } from "../../data/Data"

// Top-level service cards link to their SEO pages. A service with `children`
// (architecture) is expandable: tapping the card opens a dropdown of its
// sub-pages (works the same on desktop and mobile).
const FeaturedCard = () => {
  const [inView, setInView] = useState({})
  const [openSlug, setOpenSlug] = useState(null)
  const gridRef = useRef(null)

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

  const cardInner = (items) => (
    <>
      {items.iconify ? (
        <Icon icon={items.iconify} className="featured-iconify" />
      ) : (
        <img src={items.cover} alt={`Asymmetry — ${items.name}`} />
      )}
      <h4>{items.name}</h4>
    </>
  )

  return (
    <div className="content grid4 mtop" ref={gridRef}>
      {featured.map((items, index) => {
        const hasChildren = items.children && items.children.length > 0
        const isOpen = openSlug === items.slug

        if (!hasChildren) {
          return (
            <Link
              to={`/services/${items.slug}`}
              className={`box reveal-card ${inView[index] ? "in" : ""} has-details`}
              data-idx={index}
              key={index}
              aria-label={items.name}
            >
              <span className="service-badge">
                <Icon icon="mdi:arrow-right" className="badge-plus" />
              </span>
              {cardInner(items)}
              <span className="service-more">ვრცლად →</span>
            </Link>
          )
        }

        // architecture — expandable card with a dropdown of sub-pages
        return (
          <div
            className={`box reveal-card service-parent ${
              inView[index] ? "in" : ""
            } ${isOpen ? "open" : ""}`}
            data-idx={index}
            key={index}
          >
            <button
              type="button"
              className="service-parent-toggle"
              onClick={() => setOpenSlug(isOpen ? null : items.slug)}
              aria-expanded={isOpen}
            >
              <span className="service-badge">
                <Icon icon="mdi:chevron-down" className="badge-plus" />
              </span>
              {cardInner(items)}
              <span className="service-more">მიმართულებები ▾</span>
            </button>

            <ul className={`service-dropdown ${isOpen ? "open" : ""}`}>
              <li>
                <Link to={`/services/${items.slug}`}>
                  <Icon icon="mdi:view-grid-outline" /> {items.name}
                </Link>
              </li>
              {items.children.map((c) => (
                <li key={c.slug}>
                  <Link to={`/services/${c.slug}`}>
                    <Icon icon={c.iconify || "mdi:chevron-right"} /> {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default FeaturedCard
