import React, { useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { list } from "../data/Data"
import { useLang } from "../../i18n"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import "./projectDetail.css"

const ProjectDetail = () => {
  const { tr } = useLang()
  const { id } = useParams()
  const project = list.find((p) => String(p.id) === String(id))
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  if (!project) {
    return (
      <section className="pd">
        <div className="container pd-missing">
          <h1>პროექტი ვერ მოიძებნა</h1>
          <Link to="/projects" className="pd-back">
            ← ყველა პროექტი
          </Link>
        </div>
      </section>
    )
  }

  const { images, name, location, price, year, desc } = project

  return (
    <>
      <Seo
        title={`${name} — პროექტი | Asymmetry`}
        description={`${name} — ${location}. ფართობი ${price}. Asymmetry არქიტექტურული სტუდია.`}
        path={`/projects/${id}`}
      />
      <section className="pd">
        <div className="container">
          <Link to="/projects" className="pd-back">
            <Icon icon="mdi:arrow-left" /> {tr("ყველა პროექტი")}
          </Link>

          <div className="pd-grid">
            {/* gallery */}
            <div className="pd-gallery">
              <div
                className="pd-main"
                onClick={() => setLightboxOpen(true)}
                role="button"
                aria-label={tr("ფოტოს გადიდება")}
              >
                <img src={images[active]} alt={name} />
                <span className="pd-zoom-hint">
                  <Icon icon="mdi:magnify-plus-outline" />
                </span>
              </div>
              {images.length > 1 && (
                <div className="pd-thumbs">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`pd-thumb ${active === i ? "on" : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={`ფოტო ${i + 1}`}
                    >
                      <img src={img} alt={`${name} ${i + 1}`} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* info */}
            <aside className="pd-info">
              <h1 className="pd-title">{tr(name)}</h1>
              <p className="pd-loc">
                <Icon icon="mdi:map-marker" /> {tr(location)}
              </p>

              {desc && <p className="pd-desc">{tr(desc)}</p>}

              <div className="pd-meta">
                <div className="pd-metacard">
                  <span className="k">{tr("ფართობი")}</span>
                  <span className="v">{price}</span>
                </div>
                <div className="pd-metacard">
                  <span className="k">{tr("წელი")}</span>
                  <span className="v">{tr(year || "2026 წელი")}</span>
                </div>
              </div>

              <Link to="/contact" className="pd-cta">
                {tr("მსგავსი პროექტი გნებავთ? დაგვიკავშირდით")}
              </Link>
            </aside>
          </div>
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        index={active}
        controller={{ closeOnBackdropClick: true }}
        close={() => setLightboxOpen(false)}
        on={{ view: ({ index }) => setActive(index) }}
        slides={images.map((img) => ({ src: img }))}
        styles={{ root: { zIndex: 100000 } }}
      />
    </>
  )
}

export default ProjectDetail
