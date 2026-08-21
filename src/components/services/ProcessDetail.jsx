import React from "react"
import { Link, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { processSteps } from "../data/Data"
import { useLang } from "../../i18n"
import "./serviceDetail.css"

// A page for each "როგორ ვმუშაობთ" step at /process/<slug>.
const ProcessDetail = () => {
  const { tr } = useLang()
  const { slug } = useParams()
  const idx = processSteps.findIndex((s) => s.slug === slug)
  const step = processSteps[idx]
  const others = processSteps.filter((s) => s.slug !== slug)

  if (!step) {
    return (
      <section className="sd">
        <div className="container sd-missing">
          <h1>ეტაპი ვერ მოიძებნა</h1>
          <Link to="/" className="sd-back">
            ← მთავარი
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Seo title={step.metaTitle} description={step.metaDescription} path={`/process/${slug}`} />
      <section className="sd">
        <div className="container">
          <nav className="sd-crumbs" aria-label="breadcrumb">
            <Link to="/">{tr("მთავარი")}</Link>
            <span>/</span>
            <b>{tr("როგორ ვმუშაობთ")}</b>
            <span>/</span>
            <b>{tr(step.title)}</b>
          </nav>

          <header className="sd-head">
            <span className="sd-icon">
              <Icon icon={step.icon} />
            </span>
            <h1 className="sd-title">
              <span style={{ opacity: 0.5, marginRight: 10 }}>{`0${idx + 1}`}</span>
              {tr(step.title)}
            </h1>
          </header>

          <p className="sd-intro">{tr(step.intro)}</p>

          <div className="sd-grid">
            <div className="sd-included">
              <h2 className="sd-h2">{tr("რას მოიცავს")}</h2>
              <ul className="sd-list">
                {step.details.map((d, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-circle" /> {tr(d)}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="sd-cta-card">
              <h3>{tr("მზად ხართ დასაწყებად?")}</h3>
              <p>{tr("უფასო კონსულტაცია და ინდივიდუალური შეთავაზება.")}</p>
              <Link to="/contact" className="sd-cta">
                {tr("დაგვიკავშირდით")}
              </Link>
            </aside>
          </div>

          <div className="sd-others">
            <h2 className="sd-h2">{tr("სხვა ეტაპები")}</h2>
            <div className="sd-others-grid">
              {others.map((s) => (
                <Link key={s.slug} to={`/process/${s.slug}`} className="sd-other-card">
                  <Icon icon={s.icon} />
                  <span>{tr(s.title)}</span>
                  <Icon icon="mdi:arrow-right" className="sd-other-arrow" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProcessDetail
