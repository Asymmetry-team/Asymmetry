import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { list } from "../data/Data"
import { useLang } from "../../i18n"
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import Zoom from "yet-another-react-lightbox/plugins/zoom"
import { slidesWithSize } from "../common/lightboxSlides"
import { projectStories, typeService } from "../../data/projectStories"
import { thumb } from "../../thumb"
import "./projectDetail.css"

const ProjectDetail = () => {
  const { tr, lang } = useLang()
  const { id } = useParams()
  const project = list.find((p) => String(p.id) === String(id))
  const [active, setActive] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  // slides with their real pixel size (needed for zoom)
  const [sized, setSized] = useState(null)
  useEffect(() => {
    let alive = true
    setSized(null)
    if (project) slidesWithSize(project.images).then((s) => alive && setSized(s))
    return () => {
      alive = false
    }
  }, [project])

  if (!project) {
    return (
      <section className="pd">
        <div className="container pd-missing">
          <h1>{tr("პროექტი ვერ მოიძებნა")}</h1>
          <Link to="/projects/" className="pd-back">
            ← {tr("ყველა პროექტი")}
          </Link>
        </div>
      </section>
    )
  }

  const { images, name, location, price, year, desc } = project
  const story = projectStories[project.id]
  const paras = story ? story[lang === "en" ? "en" : "ka"] : []
  const service = story && typeService[story.type]
  // same-type projects first, then the rest — internal links between projects
  const similar = story
    ? list
        .filter((p) => p.id !== project.id && projectStories[p.id])
        .sort(
          (a, b) =>
            (projectStories[b.id].type === story.type) -
            (projectStories[a.id].type === story.type)
        )
        .slice(0, 3)
    : []
  // meta description = the story's first sentence
  const lead = paras[0] ? paras[0].split(/(?<=\.)\s/)[0] : ""

  return (
    <>
      <Seo
        title={`${tr(name)} — ${tr("პროექტი")} | Asymmetry`}
        description={lead || (lang === "en" ? `${tr(name)} — ${tr(location)}. Floor area ${tr(price)}. Asymmetry Architecture Company.` : `${name} — ${location}. ფართობი ${price}. ასიმეტრია არქიტექტურული კომპანია.`)}
        path={`/projects/${id}`}
      />
      <section className="pd">
        <div className="pd-top">
        <div className="container">
          <Link to="/projects/" className="pd-back">
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
                <img src={images[active]} alt={tr(name)} />
                <span className="pd-zoom-hint">
                  <Icon icon="mdi:magnify-plus-outline" />
                </span>
                {images.length > 1 && (
                  <>
                    <button
                      type="button"
                      className="pd-arrow pd-arrow--prev"
                      aria-label={tr("წინა ფოტო")}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActive((active - 1 + images.length) % images.length)
                      }}
                    >
                      <Icon icon="mdi:chevron-left" />
                    </button>
                    <button
                      type="button"
                      className="pd-arrow pd-arrow--next"
                      aria-label={tr("შემდეგი ფოტო")}
                      onClick={(e) => {
                        e.stopPropagation()
                        setActive((active + 1) % images.length)
                      }}
                    >
                      <Icon icon="mdi:chevron-right" />
                    </button>
                  </>
                )}
              </div>
              {images.length > 1 && (
                <div className="pd-thumbs">
                  {images.map((img, i) => (
                    <button
                      key={i}
                      className={`pd-thumb ${active === i ? "on" : ""}`}
                      onClick={() => setActive(i)}
                      aria-label={`${tr("ფოტო")} ${i + 1}`}
                    >
                      <img src={img} alt={`${tr(name)} ${i + 1}`} />
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
              <p className="pd-by">
                <Icon icon="mdi:pencil-ruler" /> {tr("შესრულებულია ლაშა კირვალიძისა და არქიტექტორების მიერ")}
              </p>

              {desc && <p className="pd-desc">{tr(desc)}</p>}
              {paras.map((t, i) => (
                <p className="pd-desc" key={i}>{t}</p>
              ))}

              <div className="pd-meta">
                <div className="pd-metacard">
                  <span className="k">{tr("ფართობი")}</span>
                  <span className="v">{tr(price)}</span>
                </div>
                <div className="pd-metacard">
                  <span className="k">{tr("წელი")}</span>
                  <span className="v">{tr(year || "2026 წელი")}</span>
                </div>
              </div>

              <Link to="/contact/" className="pd-cta">
                {tr("მსგავსი პროექტი გნებავთ? დაგვიკავშირდით")}
              </Link>

              {story && (
                <div className="pd-story-links">
                  <Link to="/services/arqiteqturuli-momsakhureba/">
                    {tr("სრული არქიტექტურული მომსახურება")} →
                  </Link>
                  {service && (
                    <Link to={service.to}>
                      {lang === "en" ? service.en : service.ka} →
                    </Link>
                  )}
                </div>
              )}
            </aside>
          </div>
        </div>
        </div>

        <div className="container">
          {similar.length > 0 && (
            <div className="pd-similar">
              <h2>{tr("მსგავსი პროექტები")}</h2>
              <div className="pd-similar-grid">
                {similar.map((p) => (
                  <Link to={`/projects/${p.id}/`} className="pd-similar-card" key={p.id}>
                    <img src={thumb(p.images[0])} alt={tr(p.name)} loading="lazy" />
                    <span>{tr(p.name)}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Lightbox
        open={lightboxOpen}
        index={active}
        controller={{ closeOnBackdropClick: true }}
        close={() => setLightboxOpen(false)}
        on={{ view: ({ index }) => setActive(index) }}
        // pinch / double-tap / wheel zoom (phones could not zoom the photos)
        plugins={[Zoom]}
        zoom={{ maxZoomPixelRatio: 3, scrollToZoom: true, doubleTapDelay: 300 }}
        slides={sized || images.map((img) => ({ src: img }))}
        styles={{ root: { zIndex: 100000 } }}
      />
    </>
  )
}

export default ProjectDetail
