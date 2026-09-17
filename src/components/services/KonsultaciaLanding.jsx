import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { processContent } from "./processContent"
import { serviceContent } from "./serviceContent"
import { list } from "../data/Data"
import WhyAsymmetry from "./WhyAsymmetry"
import HeroVideo from "./HeroVideo"
import "./serviceLanding.css"
import "./arqiteqturuli.css"
import "./konsultacia.css"

const SITE_URL = "https://asymmetry.ge"
const PHONE = "+995571141469"

// the "what the price depends on" factors — reused from the architecture page
const PRICE = serviceContent["arqiteqturuli-momsakhureba"].price

// the four "how we work" steps (same as the architecture page)
const ALL_STEPS = [
  { n: 1, label: "არქიტექტორის კონსულტაცია", slug: "konsultacia" },
  { n: 2, label: "კონცეფცია", slug: "koncefcia" },
  { n: 3, label: "პროექტის შეთანხმება & მშენებლობის ნებართვა", slug: "samushao-proeqti" },
  { n: 4, label: "ავტორის ზედამხედველობა", slug: "avtoris-zedamxedveloba" },
]

// the two intro panels — same structure as the architecture page (intro line +
// three numbered points): "why the consultation" + "what the price depends on"
const INTRO = [
  {
    h2: "რატომაა საჭირო უფასო კონსულტაცია?",
    p: "უფასო კონსულტაცია გეხმარებათ თავიდანვე მიიღოთ სწორი გადაწყვეტილება:",
    steps: [
      {
        title: "ნაკვეთის შემოწმება ყიდვამდე",
        text: "მიწას შესაძლოა სამშენებლო პირობები არ ჰქონდეს — ამას ყიდვამდე გავარკვევთ.",
      },
      {
        title: "ინდივიდუალური რჩევა",
        text: "გეტყვით, კონკრეტულად რა და რამდენი აშენდება თქვენს ნაკვეთზე.",
      },
      {
        title: "უფასო, ვალდებულების გარეშე",
        text: "უბრალოდ დაგვირეკეთ — ყველაფერს დეტალურად აგიხსნით.",
      },
    ],
  },
  {
    h2: PRICE.h2,
    p: "ფასი ინდივიდუალურია და დამოკიდებულია რამდენიმე ძირითად ფაქტორზე:",
    steps: PRICE.factors.map((f) => ({ title: f.title, text: f.text })),
  },
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

// Dedicated landing for the "არქიტექტორის კონსულტაცია" step — laid out exactly
// like the architecture service page (intro panels on top, then classes + price
// + "how we work"). All copy ships in the prerendered HTML for SEO.
const c = processContent.konsultacia

// building classes — same connected-box layout as the architecture page
const CLASSES = [
  {
    title: "I კლასი",
    icon: "mdi:home-outline",
    area: "0–60 კვ.მ",
    height: "5 მ",
    times: [
      { p: "მუნიციპალიტეტი", v: "~1 კვირა" },
      { p: "თბილისი", v: "~1 თვე" },
    ],
  },
  {
    title: "II კლასი",
    icon: "mdi:home-city-outline",
    area: "60–500 კვ.მ",
    height: "12 მ",
    times: [
      { p: "მუნიციპალიტეტი", v: "~3–4 თვე" },
      { p: "თბილისი", v: "~3–4 თვე" },
    ],
  },
  {
    title: "III კლასი",
    icon: "mdi:office-building-outline",
    area: "500–5000 კვ.მ",
    height: "ზონის მიხედვით",
    times: [{ p: "დამოკიდებულია პროექტზე", v: "ინდივიდუალური" }],
  },
]

const KonsultaciaLanding = () => {
  const [openFaq, setOpenFaq] = useState(-1)
  // which intro columns are expanded (mobile accordion; always open on desktop)
  const [introOpen, setIntroOpen] = useState([])
  const toggleIntro = (i) =>
    setIntroOpen((o) => (o.includes(i) ? o.filter((x) => x !== i) : [...o, i]))
  // inline price form (cadastral code + avg. m²) — on submit we open the
  // WhatsApp/Messenger chooser with the details pre-filled
  const [cad, setCad] = useState("")
  const [sqm, setSqm] = useState("")
  const priceReady = cad.trim() !== "" && sqm.trim() !== ""
  const submitPrice = (e) => {
    e.preventDefault()
    if (!priceReady) return
    const text =
      `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
      `მიწის საკადასტრო კოდი: ${cad.trim()}\n` +
      `შენობის საშუალო კვადრატულობა: ${sqm.trim()} მ²`
    window.dispatchEvent(
      new CustomEvent("asymmetry:contact", { detail: { text } })
    )
  }
  const openContact = () =>
    window.dispatchEvent(new CustomEvent("asymmetry:contact", { detail: {} }))
  // mobile class carousel — tappable pager (I → II → III კლასი)
  const [activeClass, setActiveClass] = useState(0)
  const goToClass = (i, e) => {
    const t = e.currentTarget
      .closest(".aq-cp-classes")
      .querySelector(".aq-class-track")
    if (!t) return
    const card = t.querySelectorAll(".aq-class")[i]
    if (!card) return
    const left =
      card.getBoundingClientRect().left - t.getBoundingClientRect().left + t.scrollLeft
    t.scrollTo({ left, behavior: "smooth" })
  }
  const onClassScroll = (e) => {
    const t = e.currentTarget
    const first = t.querySelector(".aq-class")
    const step = first ? first.getBoundingClientRect().width + 12 : 1
    setActiveClass(Math.round(t.scrollLeft / step))
  }

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
                <Link to="/services">სერვისები</Link>
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
                <button
                  type="button"
                  onClick={openContact}
                  className="sl-btn sl-btn--ghost"
                >
                  <Icon icon="mdi:chat-outline" /> მოგვწერეთ
                </button>
              </div>

              <ul className="sl-hero-badges">
                {[
                  "მიწის გაანალიზება",
                  "კოეფიციენტის გამოთვლა",
                  "განაშენიანების დადგენა",
                ].map((b, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-decagram" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* video slot — same clip as the architecture service page */}
            <div
              className="aq-hero-video aq-hero-video--poster aq-hero-video--vid"
              aria-label="ვიდეო"
            >
              <HeroVideo src="/videos/arqiteqturuli-hero.mp4" />
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

        <div className="container sl-body">
          {/* ---------- INTRO — two panels above the prices (like the service page) ---------- */}
          <section className="sl-section aq-intro">
            {INTRO.map((sec, i) => (
              <div
                className={`aq-intro-col ${introOpen.includes(i) ? "open" : ""}`}
                key={i}
              >
                <button
                  type="button"
                  className="aq-intro-head"
                  onClick={() => toggleIntro(i)}
                  aria-expanded={introOpen.includes(i)}
                >
                  <h2 className="aq-h2">{sec.h2}</h2>
                  <Icon icon="mdi:chevron-down" className="aq-intro-chev" />
                </button>
                <div className="aq-intro-body">
                  <p className="sl-p">{sec.p}</p>
                  <ol className="aq-steps">
                    {sec.steps.map((st, j) => (
                      <li className="aq-step" key={j}>
                        <span className="aq-step-n">{j + 1}</span>
                        <span className="aq-step-body">
                          <b>{st.title}</b>
                          <span>{st.text}</span>
                        </span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            ))}
          </section>

          {/* ---------- CLASSES (left) + PRICE & HOW-WE-WORK (right) — like the service page ---------- */}
          <section className="sl-section aq-cp">
            <div className="aq-cp-grid">
              <div className="aq-cp-classes">
                <div className="aq-class-grid">
                  <h2 className="aq-class-head">შენობის კლასები და ვადები</h2>
                  <div className="aq-class-track" onScroll={onClassScroll}>
                  {CLASSES.map((cl, i) => (
                    <div className="aq-class" key={i}>
                      <div className="aq-class-head-row">
                        <span className="aq-class-ico">
                          <Icon icon={cl.icon} />
                        </span>
                        <span className="aq-class-n">{cl.title}</span>
                      </div>
                      <div className="aq-class-spec">
                        <span className="aq-class-spec-h">კლასის განსაზღვრა</span>
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
                      </div>
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
                  <div className="aq-class-pager" role="tablist">
                    {CLASSES.map((cl, i) => (
                      <button
                        key={i}
                        type="button"
                        className={
                          "aq-class-pager-btn" +
                          (activeClass === i ? " active" : "")
                        }
                        onClick={(e) => goToClass(i, e)}
                        aria-label={cl.title}
                      >
                        {cl.title}
                        {i < CLASSES.length - 1 && (
                          <Icon
                            icon="mdi:chevron-right"
                            className="aq-class-pager-arrow"
                          />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="aq-cp-side">
                <div className="aq-price">
                  <span className="aq-price-badge">
                    <Icon icon="mdi:calculator-variant-outline" />
                  </span>
                  <h2 className="aq-price-t">ფასის დათვლა</h2>
                  <p className="aq-price-sub">
                    შეავსეთ ორი ველი — ფასს მოგწერთ WhatsApp-ზე ან Messenger-ზე
                  </p>
                  <form className="aq-price-form" onSubmit={submitPrice}>
                    <div className="aq-price-field">
                      <label htmlFor="kon-cad">მიწის საკადასტრო კოდი</label>
                      <div className="aq-price-input">
                        <Icon icon="mdi:barcode" />
                        <input
                          id="kon-cad"
                          type="text"
                          inputMode="numeric"
                          placeholder="მაგ. 01.10.14.005.123"
                          value={cad}
                          onChange={(e) => setCad(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <div className="aq-price-field">
                      <label htmlFor="kon-sqm">შენობის საშუალო კვადრატულობა (მ²)</label>
                      <div className="aq-price-input">
                        <Icon icon="mdi:home-outline" />
                        <input
                          id="kon-sqm"
                          type="text"
                          inputMode="decimal"
                          placeholder="მაგ. 240"
                          value={sqm}
                          onChange={(e) => setSqm(e.target.value)}
                          autoComplete="off"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      className="aq-price-btn"
                      disabled={!priceReady}
                    >
                      ფასის დათვლა
                      <Icon icon="mdi:arrow-right" />
                    </button>
                  </form>
                </div>

                <div className="aq-steps-bubble">
                  <h2 className="aq-h2">როგორ ვმუშაობთ</h2>
                  <div className="aq-steps-list">
                    {ALL_STEPS.map((s) => (
                      <Link
                        to={`/process/${s.slug}`}
                        className="aq-step-link"
                        key={s.slug}
                      >
                        <span className="aq-step-link-n">{s.n}</span>
                        <span className="aq-step-link-label">{s.label}</span>
                        <Icon
                          icon="mdi:arrow-right"
                          className="aq-step-link-arrow"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ---------- WHY ASYMMETRY ---------- */}
          <WhyAsymmetry project={list.find((p) => p.id === 16)} />

          {/* ---------- FAQ (compact, kept for SEO) ---------- */}
          {c.faq && c.faq.length > 0 && (
            <section className="sl-section kon-faq" aria-label="ხშირად დასმული კითხვები">
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

        {/* ---------- FINAL CTA (same as the service pages) ---------- */}
        <section className="sl-cta-band">
          <div className="container sl-cta-inner">
            <div>
              <h2 className="sl-cta-title">გაქვთ პროექტი შესათანხმებელი?</h2>
              <p className="sl-cta-sub">
                <b>რით შეგვიძლია დაგეხმაროთ?</b>
                <br />
                კონსულტაცია და ინდივიდუალური შეფასება უფასოა
              </p>
            </div>
            <div className="sl-cta-actions">
              <a
                href={`tel:${PHONE}`}
                className="sl-btn sl-btn--primary sl-btn--lg"
              >
                <Icon icon="mdi:phone" />
                დაგვირეკეთ
              </a>
              <button
                type="button"
                onClick={openContact}
                className="sl-btn sl-btn--ghost sl-btn--lg"
              >
                <Icon icon="mdi:chat-outline" />
                მოგვწერეთ
              </button>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}

export default KonsultaciaLanding
