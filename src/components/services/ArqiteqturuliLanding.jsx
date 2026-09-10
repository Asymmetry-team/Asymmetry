import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { serviceIndex, list } from "../data/Data"
import { serviceContent } from "./serviceContent"
import "./serviceLanding.css"
import "./arqiteqturuli.css"

const SITE_URL = "https://asymmetry.ge"

// Top navigation cards: the four flagship architecture pages. The one matching
// the current slug is highlighted ("ამ გვერდზე ხართ"); the rest are links.
const NAV = [
  {
    slug: "arqiteqturuli-momsakhureba",
    label: "არქიტექტურული მომსახურება",
    sub: "სრული ციკლი",
    icon: "mdi:pencil-ruler",
  },
  {
    slug: "1-klasis-shenobis-proeqtireba",
    label: "1 კლასის შენობა",
    sub: "0–60 კვ.მ",
    icon: "mdi:home-outline",
  },
  {
    slug: "kerdzo-sakhlis-proeqtireba",
    label: "2 კლასის პროექტი",
    sub: "60–500 კვ.მ",
    icon: "mdi:home-city-outline",
  },
  {
    slug: "korpusis-proeqtireba",
    label: "3 კლასის პროექტი",
    sub: "500–5000 კვ.მ",
    icon: "mdi:office-building-outline",
  },
]

// building classes + approval times — exactly like the consultation page
const CLASSES = [
  {
    title: "I კლასი",
    area: "0–60 კვ.მ",
    height: "5 მ",
    times: [
      { p: "მუნიციპალიტეტი", v: "~1 კვირა" },
      { p: "თბილისი", v: "~1 თვე" },
    ],
  },
  {
    title: "II კლასი",
    area: "60–500 კვ.მ",
    height: "12 მ",
    times: [
      { p: "მუნიციპალიტეტი", v: "~3–4 თვე" },
      { p: "თბილისი", v: "~3 თვე" },
    ],
  },
  {
    title: "III კლასი",
    area: "500–5000 კვ.მ",
    height: "ზონის მიხედვით",
    times: [{ p: "დამოკიდებულია პროექტზე", v: "ინდივიდუალური" }],
  },
]

const ArqiteqturuliLanding = ({ slug = "arqiteqturuli-momsakhureba" }) => {
  const [openFaq, setOpenFaq] = useState(-1)
  const c = serviceContent[slug]

  // Service + BreadcrumbList + FAQPage JSON-LD (same as the shared template).
  useEffect(() => {
    const url = `${SITE_URL}/services/${slug}/`
    const blocks = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: c.hero.h1,
        serviceType: "არქიტექტორის მომსახურება",
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
          { "@type": "ListItem", position: 2, name: "სერვისები", item: `${SITE_URL}/services/` },
          { "@type": "ListItem", position: 3, name: c.hero.h1, item: url },
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
    el.setAttribute("data-arqiteqturuli-ld", "1")
    el.textContent = JSON.stringify(blocks)
    document.head.appendChild(el)
    return () => el.remove()
  }, [slug])

  const projects = (c.projectIds || [])
    .map((id) => list.find((p) => p.id === id))
    .filter(Boolean)

  const relatedServices = (c.related || [])
    .map((rslug) => serviceIndex.find((s) => s.slug === rslug))
    .filter(Boolean)

  return (
    <>
      <Seo
        title={c.metaTitle}
        description={c.metaDescription}
        path={`/services/${slug}`}
        image={c.hero.image}
      />

      <article className="sl aq">
        {/* ---------- HERO (cover background, video slot on the right) ---------- */}
        <header className="sl-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">მთავარი</Link>
                <Icon icon="mdi:chevron-right" />
                <Link to="/services">სერვისები</Link>
                <Icon icon="mdi:chevron-right" />
                <span>{c.hero.h1}</span>
              </nav>

              <span className="sl-eyebrow">{c.hero.eyebrow}</span>
              <h1 className="sl-h1">{c.hero.h1}</h1>
              <p className="sl-lead">{c.hero.lead}</p>

              <div className="sl-hero-cta">
                <a href="tel:+995571141469" className="sl-btn sl-btn--primary">
                  <Icon icon="mdi:phone" />
                  დაგვირეკეთ
                </a>
                <Link to="/projects" className="sl-btn sl-btn--ghost">
                  <Icon icon="mdi:image-multiple-outline" />
                  ჩვენი პროექტები
                </Link>
              </div>

              <ul className="sl-hero-badges">
                {c.hero.badges
                  .filter((b) => b !== "საქართველოს მასშტაბით")
                  .map((b, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-decagram" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* video slot — deliberately left empty for a clip to be embedded */}
            <div className="aq-hero-video" aria-label="ვიდეო">
              <div className="aq-video-ph">
                <Icon icon="mdi:play-circle-outline" />
                <span>ვიდეო მალე</span>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- NAV CARDS (current page highlighted) ---------- */}
        <div className="container">
          <div className="aq-nav">
            {NAV.map((n) =>
              n.slug === slug ? (
                <div className="aq-nav-card aq-nav-card--current" key={n.slug}>
                  <span className="aq-nav-ico">
                    <Icon icon={n.icon} />
                  </span>
                  <span className="aq-nav-name">{n.label}</span>
                  <span className="aq-nav-sub">{n.sub}</span>
                  <span className="aq-nav-here">ამ გვერდზე ხართ</span>
                </div>
              ) : (
                <Link
                  to={`/services/${n.slug}`}
                  className="aq-nav-card"
                  key={n.slug}
                >
                  <span className="aq-nav-ico">
                    <Icon icon={n.icon} />
                  </span>
                  <span className="aq-nav-name">{n.label}</span>
                  <span className="aq-nav-sub">{n.sub}</span>
                  {n.sub2 && <span className="aq-nav-sub">{n.sub2}</span>}
                  <span className="aq-nav-go">
                    გახსნა <Icon icon="mdi:arrow-right" />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>

        <div className="container sl-body">
          {/* ---------- INTRO — two sections side by side ---------- */}
          <section className="sl-section aq-intro">
            {c.sections.map((sec, i) => (
              <div className="aq-intro-col" key={i}>
                <h2 className="aq-h2">{sec.h2}</h2>
                {sec.p.map((para, j) => (
                  <p className="sl-p" key={j}>
                    {para}
                  </p>
                ))}
              </div>
            ))}
          </section>

          {/* ---------- CLASSES (like the consultation page) ---------- */}
          <section className="sl-section">
            <h2 className="aq-h2">შენობის კლასები და შეთანხმების ვადები</h2>
            <div className="aq-class-grid">
              {CLASSES.map((cl, i) => (
                <div className="aq-class" key={i}>
                  <span className="aq-class-n">{cl.title}</span>
                  <ul className="aq-class-specs">
                    <li>
                      <span>მაქსიმალური კვადრატულობა</span>
                      <b>{cl.area}</b>
                    </li>
                    <li>
                      <span>მაქსიმალური სიმაღლე</span>
                      <b>{cl.height}</b>
                    </li>
                  </ul>
                  <div className="aq-class-time">
                    <span className="aq-class-time-h">შეთანხმების დრო</span>
                    <ul className="aq-class-times">
                      {cl.times.map((t, j) => (
                        <li key={j}>
                          <span>{t.p}</span>
                          <b>{t.v}</b>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ---------- PRICE (left, half) + FACTORS (right) side by side ---------- */}
          {c.price && (
            <section className="sl-section aq-price-row">
              <div className="aq-price">
                <h2 className="aq-price-t">ფასის დათვლა</h2>
                <ul className="aq-price-items">
                  <li>
                    <Icon icon="mdi:barcode" /> მიწის საკადასტრო კოდი
                  </li>
                  <li>
                    <Icon icon="mdi:home-outline" /> შენობის საშუალო კვადრატულობა
                  </li>
                </ul>
                <a href="tel:+995571141469" className="aq-price-btn">
                  <Icon icon="mdi:phone" /> ფასის დასათვლელად დარეკეთ
                </a>
              </div>

              <div className="aq-factors">
                <h2 className="aq-h2">{c.price.h2}</h2>
                <p className="aq-factors-intro">{c.price.intro}</p>
                <div className="aq-factors-grid">
                  {c.price.factors.map((f, i) => (
                    <div className="aq-factor" key={i}>
                      <Icon icon={f.icon} className="aq-factor-ico" />
                      <div>
                        <h3 className="aq-factor-t">{f.title}</h3>
                        <p className="aq-factor-p">{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {c.price.note && (
                  <p className="aq-factors-note">
                    <Icon icon="mdi:information-outline" /> {c.price.note}
                  </p>
                )}
              </div>
            </section>
          )}

          {/* ---------- WHAT'S INCLUDED ---------- */}
          <section className="sl-section">
            <h2 className="aq-h2">რას მოიცავს მომსახურება?</h2>
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
              <h2 className="aq-h2">როგორ მიმდინარეობს პროცესი?</h2>
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
              <h2 className="aq-h2">რატომ Asymmetry?</h2>
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
                  <Link to={`/projects/${p.id}`} className="sl-proj" key={p.id}>
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
              <h2 className="aq-h2">ხშირად დასმული კითხვები</h2>
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

export default ArqiteqturuliLanding
