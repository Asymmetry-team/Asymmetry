import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import { list } from "../../data/Data"
import { useLang } from "../../../i18n"
import "../../blogpage/blog.css"
import "../blog/blogCarousel.css"

// "დასრულებული პროექტები" — same design/shape/size/carousel as the blog row,
// but with project cards. Three visible on desktop, the rest scroll in.
const ProjectsBlog = () => {
  const { t, tr } = useLang()
  const trackRef = useRef(null)
  const items = list
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(false)

  // hide the left arrow at the very start, the right arrow at the very end
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
  }, [])

  useEffect(() => {
    const el = trackRef.current
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

  const scroll = (dir) => {
    const el = trackRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" })
  }

  if (items.length === 0) return null

  return (
    <section className="blog-carousel-section padding" id="home-projects">
      <div className="container">
        <div className="carousel-bubble">
        <Link to="/projects" className="home-section-link">
          <Heading accent title={t("home.projects")} />
        </Link>
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
                className="blog-card blog-carousel-card reveal-card"
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
                  <p>
                    {p.price}
                    {p.year ? ` · ${tr(p.year)}` : ""}
                  </p>
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
        </div>
      </div>
    </section>
  )
}

export default ProjectsBlog
