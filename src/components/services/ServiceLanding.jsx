import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { serviceIndex, list } from "../data/Data"
import { serviceContent } from "./serviceContent"
import "./serviceLanding.css"

const SITE_URL = "https://asymmetry.ge"

// Premium, magazine-style SEO landing page for the four flagship architecture
// services. Content comes from serviceContent.js; the generic <ServiceDetail>
// delegates here for those slugs. All copy is prerendered (no hide-on-load
// animations), so every keyword-rich paragraph and FAQ answer ships in the
// static HTML and is fully indexed by Google.
const ServiceLanding = ({
  slug,
  content,
  basePath = "/services",
  crumbLabel = "სერვისები",
  crumbPath = "/services",
  name,
}) => {
  const c = content || serviceContent[slug]
  const service = serviceIndex.find((s) => s.slug === slug)
  const displayName =
    name || (service && service.name) || (c && c.hero && c.hero.h1)
  const [openFaq, setOpenFaq] = useState(-1)

  // Inject Service + BreadcrumbList + FAQPage JSON-LD for rich results.
  useEffect(() => {
    if (!c) return
    const url = `${SITE_URL}${basePath}/${slug}/`
    const crumbItem =
      crumbPath === "/"
        ? `${SITE_URL}/`
        : `${SITE_URL}${crumbPath.replace(/\/?$/, "/")}`
    const blocks = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: displayName,
        serviceType: displayName,
        description: c.metaDescription,
        areaServed: { "@type": "Country", name: "Georgia" },
        provider: {
          "@type": "ProfessionalService",
          name: "Asymmetry",
          url: SITE_URL,
          telephone: "+995571141469",
        },
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "მთავარი", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: crumbLabel, item: crumbItem },
          { "@type": "ListItem", position: 3, name: displayName, item: url },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: (c.faq || []).map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ]
    const el = document.createElement("script")
    el.type = "application/ld+json"
    el.setAttribute("data-landing-ld", "1")
    el.textContent = JSON.stringify(blocks)
    document.head.appendChild(el)
    return () => el.remove()
  }, [slug, c])

  if (!c) return null

  const relatedServices = (c.related || [])
    .map((rslug) => serviceIndex.find((s) => s.slug === rslug))
    .filter(Boolean)

  const projects = (c.projectIds || [])
    .map((id) => list.find((p) => p.id === id))
    .filter(Boolean)

  return (
    <>
      <Seo
        title={c.metaTitle}
        description={c.metaDescription}
        path={`${basePath}/${slug}`}
        image={c.hero.image}
      />

      <article className="sl">
        {/* ---------- HERO ---------- */}
        <header className="sl-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">მთავარი</Link>
                <Icon icon="mdi:chevron-right" />
                <Link to={crumbPath}>{crumbLabel}</Link>
                <Icon icon="mdi:chevron-right" />
                <span>{displayName}</span>
              </nav>

              <span className="sl-eyebrow">{c.hero.eyebrow}</span>
              <h1 className="sl-h1">{c.hero.h1}</h1>
              <p className="sl-lead">{c.hero.lead}</p>

              <div className="sl-hero-cta">
                <Link to="/contact" className="sl-btn sl-btn--primary">
                  <Icon icon="mdi:calendar-check-outline" />
                  უფასო კონსულტაცია
                </Link>
                <Link to="/projects" className="sl-btn sl-btn--ghost">
                  <Icon icon="mdi:image-multiple-outline" />
                  ჩვენი პროექტები
                </Link>
              </div>

              <ul className="sl-hero-badges">
                {c.hero.badges.map((b, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-decagram" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="sl-hero-media">
              <img
                src={c.hero.image}
                alt={c.hero.imageAlt}
                loading="eager"
                width="1600"
                height="900"
              />
              <span className="sl-hero-media-tag">
                <Icon icon={(c.hero.tag && c.hero.tag.icon) || "mdi:cube-scan"} />{" "}
                {(c.hero.tag && c.hero.tag.label) || "3D ვიზუალიზაცია"}
              </span>
            </div>
          </div>
        </header>

        {/* ---------- STATS ---------- */}
        {c.stats && c.stats.length > 0 && (
          <div className="container">
            <div className="sl-stats">
              {c.stats.map((s, i) => (
                <div className="sl-stat" key={i}>
                  <span className="sl-stat-v">{s.v}</span>
                  <span className="sl-stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="container sl-body">
          {/* ---------- LONG-FORM SECTIONS ---------- */}
          {c.sections.map((sec, i) => (
            <section className="sl-section" key={i}>
              <h2 className="sl-h2">{sec.h2}</h2>
              {sec.p.map((para, j) => (
                <p className="sl-p" key={j}>
                  {para}
                </p>
              ))}
            </section>
          ))}

          {/* ---------- CLASS INFO (SEO explainer) ---------- */}
          {c.classInfo && (
            <section className="sl-section">
              <div className="sl-class">
                <div className="sl-class-head">
                  <span className="sl-class-ico">
                    <Icon icon="mdi:shield-home-outline" />
                  </span>
                  <div>
                    <h2 className="sl-h2 sl-h2--flush">{c.classInfo.h2}</h2>
                    <p className="sl-p sl-p--flush">{c.classInfo.intro}</p>
                  </div>
                </div>
                <ul className="sl-class-rows">
                  {c.classInfo.rows.map((r, i) => (
                    <li key={i}>
                      <span className="sl-class-k">{r.k}</span>
                      <span className="sl-class-v">{r.v}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* ---------- PRICE FACTORS ---------- */}
          {c.price && (
            <section className="sl-section">
              <div className="sl-price">
                <h2 className="sl-h2 sl-h2--flush">{c.price.h2}</h2>
                <p className="sl-p">{c.price.intro}</p>
                <div className="sl-price-factors">
                  {c.price.factors.map((f, i) => (
                    <div className="sl-pf" key={i}>
                      <Icon icon={f.icon} className="sl-pf-ico" />
                      <div>
                        <h3 className="sl-pf-t">{f.title}</h3>
                        <p className="sl-pf-p">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="sl-price-note">
                  <Icon icon="mdi:information-outline" />
                  {c.price.note}
                </p>
              </div>
            </section>
          )}

          {/* ---------- WHAT'S INCLUDED ---------- */}
          <section className="sl-section">
            <h2 className="sl-h2">რას მოიცავს მომსახურება?</h2>
            <div className="sl-cards">
              {c.includes.map((it, i) => (
                <div className="sl-card" key={i}>
                  <span className="sl-card-ico">
                    <Icon icon={it.icon} />
                  </span>
                  <h3 className="sl-card-t">{it.title}</h3>
                  <p className="sl-card-p">{it.text}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- PROCESS ---------- */}
          {c.process && c.process.length > 0 && (
          <section className="sl-section">
            <h2 className="sl-h2">როგორ მიმდინარეობს პროცესი?</h2>
            <div className="sl-steps">
              {c.process.map((st, i) => (
                <div className="sl-step" key={i}>
                  <span className="sl-step-n">{String(i + 1).padStart(2, "0")}</span>
                  <div className="sl-step-body">
                    <h3 className="sl-step-t">{st.title}</h3>
                    <p className="sl-step-p">{st.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* ---------- ADVANTAGES ---------- */}
          {c.advantages && c.advantages.length > 0 && (
          <section className="sl-section">
            <h2 className="sl-h2">რატომ Asymmetry?</h2>
            <div className="sl-adv">
              {c.advantages.map((a, i) => (
                <div className="sl-adv-item" key={i}>
                  <span className="sl-adv-ico">
                    <Icon icon={a.icon} />
                  </span>
                  <div>
                    <h3 className="sl-adv-t">{a.title}</h3>
                    <p className="sl-adv-p">{a.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
          )}

          {/* ---------- PROJECTS GALLERY ---------- */}
          {projects.length > 0 && (
            <section className="sl-section">
              <div className="sl-projects-head">
                <h2 className="sl-h2 sl-h2--flush">ჩვენი ნამუშევრები</h2>
                <Link to="/projects" className="sl-seeall">
                  ყველა პროექტი <Icon icon="mdi:arrow-right" />
                </Link>
              </div>
              <div className="sl-gallery">
                {projects.map((p) => (
                  <Link
                    to={`/projects/${p.id}`}
                    className="sl-proj"
                    key={p.id}
                  >
                    <div className="sl-proj-img">
                      <img src={p.images[0]} alt={p.name} loading="lazy" />
                      {p.price && <span className="sl-proj-badge">{p.price}</span>}
                    </div>
                    <div className="sl-proj-meta">
                      <span className="sl-proj-name">{p.name}</span>
                      {p.location && (
                        <span className="sl-proj-loc">
                          <Icon icon="mdi:map-marker-outline" />
                          {p.location}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ---------- FAQ ---------- */}
          {c.faq && c.faq.length > 0 && (
            <section className="sl-section" aria-label="ხშირად დასმული კითხვები">
              <h2 className="sl-h2">ხშირად დასმული კითხვები</h2>
              <div className="sl-faq">
                {c.faq.map((f, i) => (
                  <div
                    className={`sl-faq-item ${openFaq === i ? "open" : ""}`}
                    key={i}
                  >
                    <button
                      className="sl-faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{f.q}</span>
                      <Icon icon="mdi:chevron-down" className="sl-faq-chev" />
                    </button>
                    {/* answer stays in the DOM (collapsed via CSS) for indexing */}
                    <div className="sl-faq-a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* ---------- FINAL CTA ---------- */}
        <section className="sl-cta-band">
          <div className="container sl-cta-inner">
            <div>
              <h2 className="sl-cta-title">გაქვთ პროექტი გასაშვები?</h2>
              <p className="sl-cta-sub">
                მოგვიყევით თქვენი იდეის შესახებ — პირველი კონსულტაცია და
                ინდივიდუალური შეთავაზება უფასოა.
              </p>
            </div>
            <div className="sl-cta-actions">
              <Link to="/contact" className="sl-btn sl-btn--primary sl-btn--lg">
                <Icon icon="mdi:message-text-outline" />
                დაგვიკავშირდით
              </Link>
              <a href="tel:+995571141469" className="sl-btn sl-btn--ghost sl-btn--lg">
                <Icon icon="mdi:phone" />
                571 14 14 69
              </a>
            </div>
          </div>
        </section>

        {/* ---------- RELATED SERVICES ---------- */}
        {relatedServices.length > 0 && (
          <div className="container sl-body">
            <section className="sl-section sl-related">
              <h2 className="sl-h2">მონათესავე სერვისები</h2>
              <div className="sl-related-grid">
                {relatedServices.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="sl-related-card"
                  >
                    <Icon
                      icon={s.iconify || "mdi:office-building-outline"}
                      className="sl-related-ico"
                    />
                    <span>{s.name}</span>
                    <Icon icon="mdi:arrow-right" className="sl-related-arrow" />
                  </Link>
                ))}
              </div>
            </section>
          </div>
        )}
      </article>
    </>
  )
}

export default ServiceLanding
