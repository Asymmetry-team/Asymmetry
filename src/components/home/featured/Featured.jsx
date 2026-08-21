import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import { featured, processSteps } from "../../data/Data"
import { useLang } from "../../../i18n"
import "./Featured.css"

const steps = processSteps

// partner logos (placeholder SVGs in /public/images/partners/)
const partners = [
  "studio",
  "decor",
  "ceramiq",
  "lumen",
  "terra",
  "nordic",
]

// Home top row: ONE services bubble (architecture on the left, other services
// on the right) beside a "როგორ ვმუშაობთ" process bubble (a small carousel).
const Featured = () => {
  const { t, tr } = useLang()
  const architecture = featured[0]
  const archPages = [architecture, ...(architecture.children || [])]
  const others = featured.slice(1)

  const [isMobile, setIsMobile] = useState(false)
  const [open, setOpen] = useState({ arch: true, others: true })

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 820px)")
    const update = () => {
      setIsMobile(mq.matches)
      setOpen(mq.matches ? { arch: false, others: false } : { arch: true, others: true })
    }
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  const toggle = (k) => setOpen((o) => ({ ...o, [k]: !o[k] }))

  // same scroll fade-up reveal as the blog / projects cards
  const sectionRef = useRef(null)
  useEffect(() => {
    const el = sectionRef.current
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
          if (e.intersectionRatio >= 0.12) e.target.classList.add("in")
          else if (e.intersectionRatio === 0) e.target.classList.remove("in")
        }),
      { threshold: [0, 0.12] }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  const card = (s) => (
    <Link key={s.slug} to={`/services/${s.slug}`} className="hs-card">
      <span className="hs-card-ico">
        <Icon icon={s.iconify || "mdi:office-building-outline"} />
      </span>
      <span className="hs-card-name">{tr(s.short || s.name)}</span>
      <Icon icon="mdi:arrow-right" className="hs-card-arrow" />
    </Link>
  )

  const subCol = (key, icon, title, pages) => (
    <div className={`svc-sub ${open[key] ? "open" : "collapsed"}`}>
      <button
        type="button"
        className="svc-sub-title"
        onClick={() => isMobile && toggle(key)}
        aria-expanded={open[key]}
      >
        <Icon icon={icon} className="svc-sub-ico" />
        <span>{title}</span>
        <Icon icon="mdi:chevron-down" className="svc-sub-chevron" />
      </button>
      <div className="hs-cards svc-sub-cards">{pages.map(card)}</div>
    </div>
  )

  return (
    <section className="featured background" id="home-services" ref={sectionRef}>
      <div className="container">
        <div className="home-top">
          {/* ---- left column: services bubble + partners below it ---- */}
          <div className="home-left">
            <div className="bubble svc-bubble reveal-card">
              <Link to="/services" className="bubble-head bubble-head--link">
                <span className="bubble-title">{t("home.services")}</span>
              </Link>
              <div className="svc-cols">
                {subCol("arch", "mdi:ruler-square-compass", t("svc.arch"), archPages)}
                {subCol("others", "mdi:dots-grid", t("svc.other"), others)}
              </div>
            </div>

            {/* auto-rotating partners marquee, under the services bubble */}
            <div className="bubble partners-bubble reveal-card">
              <div className="bubble-head partners-head">
                <span className="bubble-title">{t("home.partners")}</span>
              </div>
              <div className="partners-viewport">
                <div className="partners-marquee">
                  {[...partners, ...partners].map((p, i) => (
                    <img
                      key={i}
                      className="partner-logo"
                      src={`/images/partners/${p}.svg`}
                      alt={p}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ---- process bubble ---- */}
          <div className="bubble proc-bubble reveal-card">
            <div className="bubble-head">
              <span className="bubble-title">{t("home.process")}</span>
            </div>
            <div className="proc-grid">
              {steps.map((s, i) => (
                <Link className="proc-card" to={`/process/${s.slug}`} key={i}>
                  <span className="proc-ico">
                    <Icon icon={s.icon} />
                  </span>
                  <span className="proc-step">{`${i + 1} ${tr("ეტაპი")}`}</span>
                  <h4>{tr(s.title)}</h4>
                  <p>{tr(s.text)}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Featured
