import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useLang } from "../../i18n"
import { useCardSwipe } from "../../hooks/useCardSwipe"
import "../home/blog/blogCarousel.css"

// Horizontal, swipeable projects carousel — identical design & behaviour to the
// home-page projects row (blogCarousel.css). Reused on the service & process
// pages so "ჩვენი ნამუშევრები" scrolls exactly like the home page (3 across with
// arrows on desktop, swipe on mobile).
const ProjectsCarousel = ({ items }) => {
  const { tr } = useLang()
  const trackRef = useRef(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  useEffect(() => {
    const el = trackRef.current
    if (!el) return
    const update = () => {
      setAtStart(el.scrollLeft <= 8)
      setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8)
    }
    update()
    el.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", update)
    return () => {
      el.removeEventListener("scroll", update)
      window.removeEventListener("resize", update)
    }
  }, [items])

  // one glitch-free card per swipe (finger-driven, no momentum fight)
  useCardSwipe(trackRef, [items])

  const scroll = (dir) => {
    const el = trackRef.current
    if (!el) return
    // advance exactly ONE card (card width + gap), never jump two
    const card = el.querySelector(".blog-carousel-card")
    const step = card
      ? card.getBoundingClientRect().width + 24
      : el.clientWidth * 0.85
    el.scrollBy({ left: dir * step, behavior: "smooth" })
  }

  if (!items || items.length === 0) return null

  return (
    <div className="blog-carousel-frame">
      <button
        className={`carousel-arrow carousel-arrow--left ${
          atStart ? "carousel-arrow--off" : ""
        }`}
        onClick={() => scroll(-1)}
        aria-label="წინა"
      >
        <Icon icon="mdi:chevron-left" />
      </button>

      <div className="blog-carousel-track" ref={trackRef}>
        {items.map((p) => (
          <Link
            to={`/projects/${p.id}`}
            className="blog-card blog-carousel-card"
            key={p.id}
          >
            <div
              className="blog-card-img"
              style={{ backgroundImage: `url(${p.images[0]})` }}
            />
            <div className="blog-card-body">
              <span className="blog-card-date">
                <Icon icon="mdi:map-marker" /> {tr(p.location)}
              </span>
              <h3>{tr(p.name)}</h3>
              <div className="blog-card-specs">
                {p.price && <span className="blog-card-area">{p.price}</span>}
                {p.year && <span className="blog-card-year">{tr(p.year)}</span>}
              </div>
              <span className="blog-card-more">{tr("დეტალურად ნახვა →")}</span>
            </div>
          </Link>
        ))}
      </div>

      <button
        className={`carousel-arrow carousel-arrow--right ${
          atEnd ? "carousel-arrow--off" : ""
        }`}
        onClick={() => scroll(1)}
        aria-label="შემდეგი"
      >
        <Icon icon="mdi:chevron-right" />
      </button>
    </div>
  )
}

export default ProjectsCarousel
