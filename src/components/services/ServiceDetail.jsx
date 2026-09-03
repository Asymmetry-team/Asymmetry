import React, { useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { featured, serviceIndex } from "../data/Data"
import { useLang } from "../../i18n"
import ServiceFaq from "./ServiceFaq"
import ServiceLanding from "./ServiceLanding"
import { serviceContent } from "./serviceContent"
import "./serviceDetail.css"

const SITE_URL = "https://asymmetry.ge"

// Generic template used by every service EXCEPT the four flagship architecture
// pages (those render through <ServiceLanding>). Kept as its own component so
// the hook order stays stable when navigating between service slugs.
const ServiceDetailGeneric = () => {
  const { tr } = useLang()
  const { slug } = useParams()
  const service = serviceIndex.find((s) => s.slug === slug)
  const subServices = service && service.children ? service.children : []
  const others = featured.filter((s) => s.slug !== slug).slice(0, 4)

  // Inject Service + BreadcrumbList JSON-LD for rich results; clean up on unmount.
  useEffect(() => {
    if (!service) return
    const url = `${SITE_URL}/services/${service.slug}`
    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: service.name,
        serviceType: service.name,
        description: service.metaDescription,
        areaServed: { "@type": "Country", name: "Georgia" },
        provider: {
          "@type": "ProfessionalService",
          name: "Asymmetry",
          url: SITE_URL,
        },
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "მთავარი", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "სერვისები", item: `${SITE_URL}/services/` },
          { "@type": "ListItem", position: 3, name: service.name, item: url },
        ],
      },
    ]
    const el = document.createElement("script")
    el.type = "application/ld+json"
    el.setAttribute("data-service-ld", "1")
    el.textContent = JSON.stringify(ld)
    document.head.appendChild(el)
    return () => el.remove()
  }, [service])

  if (!service) {
    return (
      <section className="sd">
        <div className="container sd-missing">
          <h1>სერვისი ვერ მოიძებნა</h1>
          <Link to="/services" className="sd-back">
            ← ყველა სერვისი
          </Link>
        </div>
      </section>
    )
  }

  return (
    <>
      <Seo
        title={service.metaTitle}
        description={service.metaDescription}
        path={`/services/${service.slug}`}
      />
      <section className="sd">
        <div className="container">
          <nav className="sd-crumbs" aria-label="breadcrumb">
            <Link to="/">{tr("მთავარი")}</Link>
            <span>/</span>
            <Link to="/services">{tr("სერვისები")}</Link>
            <span>/</span>
            <b>{tr(service.name)}</b>
          </nav>

          <header className="sd-head">
            <span className="sd-icon">
              <Icon icon={service.iconify || "mdi:office-building-outline"} />
            </span>
            <h1 className="sd-title">{tr(service.name)}</h1>
          </header>

          <p className="sd-intro">{tr(service.intro)}</p>

          {subServices.length > 0 && (
            <div className="sd-sub">
              <h2 className="sd-h2">{tr("მიმართულებები")}</h2>
              <div className="sd-sub-grid">
                {subServices.map((c) => (
                  <Link
                    key={c.slug}
                    to={`/services/${c.slug}`}
                    className="sd-sub-card"
                  >
                    <Icon icon={c.iconify || "mdi:office-building-outline"} />
                    <span className="sd-sub-name">{tr(c.name)}</span>
                    <Icon icon="mdi:arrow-right" className="sd-sub-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* two side-by-side bubbles: what's included (left) + other services (right) */}
          <div className="sd-two">
            <div className="bubble sd-bubble">
              <div className="bubble-head">
                <span className="bubble-title">{tr("რას მოიცავს")}</span>
              </div>
              <ul className="sd-list sd-list--stack">
                {service.details.map((d, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-circle" /> {tr(d)}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bubble sd-bubble">
              <div className="bubble-head">
                <span className="bubble-title">{tr("სხვა სერვისები")}</span>
              </div>
              <div className="sd-others-grid sd-others-grid--stack">
                {others.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="sd-other-card"
                  >
                    <Icon icon={s.iconify || "mdi:office-building-outline"} />
                    <span>{tr(s.name)}</span>
                    <Icon icon="mdi:arrow-right" className="sd-other-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <ServiceFaq name={service.name} details={service.details} />

          <aside className="sd-cta-card sd-cta-wide">
            <h3>
              {tr("გჭირდებათ")} {tr(service.name)}?
            </h3>
            <p>{tr("უფასო კონსულტაცია და ინდივიდუალური შეთავაზება.")}</p>
            <Link to="/contact" className="sd-cta">
              {tr("დაგვიკავშირდით")}
            </Link>
          </aside>
        </div>
      </section>
    </>
  )
}

// Dispatcher: this is the only hook it calls (useParams), so switching between a
// premium slug and a generic one swaps child component TYPES (safe) rather than
// changing the hook count of a single component instance.
const ServiceDetail = () => {
  const { slug } = useParams()
  if (serviceContent[slug]) return <ServiceLanding slug={slug} />
  return <ServiceDetailGeneric />
}

export default ServiceDetail
