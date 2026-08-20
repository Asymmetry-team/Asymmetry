import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { list } from "../../data/Data"

// Completed projects panel.
//   Desktop — 4 projects at a time in a 2×2 grid; arrows page to the next 4.
//   Mobile  — a swipeable peek carousel (one project + a slice of the next),
//             no arrows (finger scroll / snap).
const projectCard = (p) => (
  <Link to={`/projects/${p.id}`} className="pp-card" key={p.id}>
    <div className="pp-img" style={{ backgroundImage: `url(${p.images[0]})` }} />
    <div className="pp-body">
      <h4 className="pp-name">{p.name}</h4>
      <p className="pp-loc">
        <Icon icon="mdi:map-marker" /> {p.location}
      </p>
      <div className="pp-meta">
        <span className="pp-badge">{p.price}</span>
        <span className="pp-badge">{p.year || "2026 წელი"}</span>
      </div>
      <span className="pp-more">დეტალურად ნახვა →</span>
    </div>
  </Link>
)

const ProjectsPanel = () => {
  const [isMobile, setIsMobile] = useState(false)
  const [page, setPage] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)")
    const update = () => setIsMobile(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // ----- mobile: swipe carousel -----
  if (isMobile) {
    const items = list.slice(0, 8)
    return (
      <div className="pp pp--mobile">
        <div className="pp-track">{items.map(projectCard)}</div>
      </div>
    )
  }

  // ----- desktop: 2×2 grid, 4 per page, arrows -----
  const perPage = 4
  const pages = Math.ceil(list.length / perPage)
  const start = page * perPage
  const shown = list.slice(start, start + perPage)
  const go = (dir) => setPage((v) => (v + dir + pages) % pages)

  return (
    <div className="pp pp--desktop">
      <div className="pp-stage">
        <button className="pp-arrow pp-arrow--left" onClick={() => go(-1)} aria-label="წინა">
          <Icon icon="mdi:chevron-left" />
        </button>

        <div className="pp-grid">{shown.map(projectCard)}</div>

        <button className="pp-arrow pp-arrow--right" onClick={() => go(1)} aria-label="შემდეგი">
          <Icon icon="mdi:chevron-right" />
        </button>
      </div>

      <div className="pp-dots">
        {Array.from({ length: pages }).map((_, d) => (
          <button
            key={d}
            className={`pp-dot ${d === page ? "on" : ""}`}
            onClick={() => setPage(d)}
            aria-label={`გვერდი ${d + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ProjectsPanel
