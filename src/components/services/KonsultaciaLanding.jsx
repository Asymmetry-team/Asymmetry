import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { processContent } from "./processContent"
import { serviceContent } from "./serviceContent"
import "./serviceLanding.css"
import "./arqiteqturuli.css"
import "./konsultacia.css"

const SITE_URL = "https://asymmetry.ge"
const PHONE = "+995571141469"
const MESSENGER = "https://m.me/100092504264433"

// the "what the price depends on" factors — reused from the architecture page
const PRICE = serviceContent["arqiteqturuli-momsakhureba"].price

// the remaining "how we work" steps (2–4), linked from the consultation page
const OTHER_STEPS = [
  { n: 2, label: "კონცეფცია", slug: "koncefcia" },
  { n: 3, label: "პროექტის შეთანხმება & მშენებლობის ნებართვა", slug: "samushao-proeqti" },
  { n: 4, label: "ავტორის ზედამხედველობა", slug: "avtoris-zedamxedveloba" },
]

// The four architecture service pages — shown as nav cards (all clickable; none
// is "current" here, since the consultation page is not one of them).
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

// Dedicated, deliberately LACONIC landing for the "არქიტექტორის კონსულტაცია"
// step. Built as a Facebook backlink target: a first-time visitor must grasp
// the point of the consultation in seconds. Everything is laid out
// horizontally (side-by-side cards / a 3-column class grid) instead of one
// long vertical wall of text. All copy still ships in the prerendered HTML
// (no hide-on-load), so it stays fully indexable, and the FAQ JSON-LD is kept.
const c = processContent.konsultacia

// building classes — 3 columns
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

const KonsultaciaLanding = () => {
  const [openFaq, setOpenFaq] = useState(-1)

  useEffect(() => {
    const url = `${SITE_URL}/process/konsultacia/`
    const blocks = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: c.hero.h1,
        serviceType: "არქიტექტორის კონსულტაცია",
        description: c.metaDescription,
        areaServed: { "@type": "Country", name: "Georgia" },
        provider: {
          "@type": "ProfessionalService",
          name: "Asymmetry",
          url: SITE_URL,
          telephone: PHONE,
        },
        url,
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "მთავარი", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: c.hero.h1, item: url },
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
    el.setAttribute("data-konsultacia-ld", "1")
    el.textContent = JSON.stringify(blocks)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <>
      <Seo
        title={c.metaTitle}
        description={c.metaDescription}
        path="/process/konsultacia"
        image={c.hero.image}
      />

      <article className="kon sl">
        {/* ---------- HERO (dark cover + video slot, like the service page) ---------- */}
        <header className="sl-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">მთავარი</Link>
                <Icon icon="mdi:chevron-right" />
                <span>არქიტექტორის კონსულტაცია</span>
              </nav>
              <span className="sl-eyebrow">სამუშაო პროცესი · ეტაპი 1</span>
              <h1 className="sl-h1">არქიტექტორის კონსულტაცია</h1>
              <div className="sl-lead kon-hero-lead">
                <ul className="kon-hero-qs">
                  <li>შეგიძლია შენს მიწაზე მშენებლობა?</li>
                  <li>რამდენი კვადრატულის აშენება შეგიძლია?</li>
                  <li>შეზღუდვები ხომ არ აქვს მიწას?</li>
                  <li>შეგიძლია სახლის აშენება? იქნებ სატყეო ან სამრეწველო ზონაა?</li>
                </ul>
                <p className="kon-hero-cta-line">
                  სამშენებლო პირობების გასარკვევად დაგვიკავშირდი და მოიმარჯვეთ
                  მიწის საკადასტრო კოდი
                </p>
              </div>
              <div className="sl-hero-cta">
                <a href={`tel:${PHONE}`} className="sl-btn sl-btn--primary">
                  <Icon icon="mdi:phone" /> დაგვირეკეთ
                </a>
                <a
                  href={MESSENGER}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="sl-btn sl-btn--ghost"
                >
                  <Icon icon="mdi:facebook-messenger" /> მოგვწერეთ
                </a>
              </div>
            </div>

            {/* video slot — empty, ready for a clip */}
            <div className="aq-hero-video" aria-label="ვიდეო">
              <div className="aq-video-ph">
                <Icon icon="mdi:play-circle-outline" />
                <span>ვიდეო მალე</span>
              </div>
            </div>
          </div>
        </header>

        {/* ---------- NAV CARDS (all architecture pages) ---------- */}
        <div className="container">
          <div className="aq-nav">
            {NAV.map((n) => (
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
                <span className="aq-nav-go">
                  გახსნა <Icon icon="mdi:arrow-right" />
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="container kon-body">
          {/* ---------- CLASSES (3 columns) ---------- */}
          <section className="kon-classes">
            <h2 className="kon-h2">შენობის კლასები და შეთანხმების ვადები</h2>
            <div className="kon-class-grid">
              {CLASSES.map((cl, i) => (
                <div className="kon-class" key={i}>
                  <span className="kon-class-n">{cl.title}</span>
                  <ul className="kon-class-specs">
                    <li>
                      <span>მაქსიმალური კვადრატულობა</span>
                      <b>{cl.area}</b>
                    </li>
                    <li>
                      <span>მაქსიმალური სიმაღლე</span>
                      <b>{cl.height}</b>
                    </li>
                  </ul>
                  <div className="kon-class-time">
                    <span className="kon-class-time-h">შეთანხმების დრო</span>
                    <ul className="kon-class-times">
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

          {/* ---------- PRICE + STEPS (side by side), FACTORS below ---------- */}
          <section className="kon-price-block">
            <div className="kon-price-pair">
              <div className="kon-price">
                <h2 className="kon-price-t">ფასის დათვლა</h2>
                <ul className="kon-price-items">
                  <li>
                    <Icon icon="mdi:barcode" /> მიწის საკადასტრო კოდი
                  </li>
                  <li>
                    <Icon icon="mdi:home-outline" /> შენობის საშუალო კვადრატულობა
                  </li>
                </ul>
                <a
                  href={`tel:${PHONE}`}
                  className="kon-btn kon-btn--primary kon-btn--lg"
                >
                  <Icon icon="mdi:phone" /> ფასის დასათვლელად დარეკეთ
                </a>
              </div>

              <div className="kon-steps-bubble">
                <h2 className="aq-h2">სხვა ეტაპები</h2>
                <div className="kon-steps-list">
                  {OTHER_STEPS.map((s) => (
                    <Link
                      to={`/process/${s.slug}`}
                      className="kon-step-link"
                      key={s.slug}
                    >
                      <span className="kon-step-n">{s.n}</span>
                      <span className="kon-step-label">{s.label}</span>
                      <Icon icon="mdi:arrow-right" className="kon-step-arrow" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {PRICE && (
              <div className="kon-factors-open">
                <h2 className="aq-h2">{PRICE.h2}</h2>
                <p className="kon-factors-open-intro">{PRICE.intro}</p>
                <div className="kon-factors-cols">
                  {PRICE.factors.map((f, i) => (
                    <div className="kon-factor-col" key={i}>
                      <span className="kon-factor-ico">
                        <Icon icon={f.icon} />
                      </span>
                      <h3 className="kon-factor-t">{f.title}</h3>
                      <p className="kon-factor-p">{f.text}</p>
                    </div>
                  ))}
                </div>
                {PRICE.note && (
                  <p className="kon-factors-open-note">
                    <Icon icon="mdi:information-outline" /> {PRICE.note}
                  </p>
                )}
              </div>
            )}
          </section>

          {/* ---------- FAQ (compact, kept for SEO) ---------- */}
          {c.faq && c.faq.length > 0 && (
            <section className="kon-faq" aria-label="ხშირად დასმული კითხვები">
              <h2 className="kon-h2">ხშირად დასმული კითხვები</h2>
              <div className="kon-faq-list">
                {c.faq.map((f, i) => (
                  <div
                    className={`kon-faq-item ${openFaq === i ? "open" : ""}`}
                    key={i}
                  >
                    <button
                      className="kon-faq-q"
                      onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                      aria-expanded={openFaq === i}
                    >
                      <span>{f.q}</span>
                      <Icon icon="mdi:chevron-down" className="kon-faq-chev" />
                    </button>
                    <div className="kon-faq-a">
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </>
  )
}

export default KonsultaciaLanding
