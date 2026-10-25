import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useLang } from "../../i18n"
import { useCardSwipe } from "../../hooks/useCardSwipe"
import "../home/blog/blogCarousel.css"
import { thumb } from "../../thumb"

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

  // card photos are 200–400 KB each and the carousel sits below the fold, so
  // they load only once it's about to scroll into view (they used to compete
  // with the hero for bandwidth on mobile). Off in the pre-render too, so the
  // hydrated markup matches.
  const [showImgs, setShowImgs] = useState(false)
  useEffect(() => {
    const el = trackRef.current
    if (!el || showImgs) return
    if (typeof IntersectionObserver === "undefined") {
      setShowImgs(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShowImgs(true)
          io.disconnect()
        }
      },
      { rootMargin: "400px 0px" }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [showImgs, items])

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
        aria-label={tr("წინა")}
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
              style={showImgs ? { backgroundImage: `url(${thumb(p.images[0])})` } : undefined}
            />
            <div className="blog-card-body">
              <span className="blog-card-date">
                <Icon icon="mdi:map-marker" /> {tr(p.location)}
              </span>
              <h3>{tr(p.name)}</h3>
              <div className="blog-card-specs">
                {p.price && <span className="blog-card-area">{tr(p.price)}</span>}
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
        aria-label={tr("შემდეგი")}
      >
        <Icon icon="mdi:chevron-right" />
      </button>
    </div>
  )
}

export default ProjectsCarousel
