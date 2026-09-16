import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { list } from "../data/Data"
import { serviceContent } from "./serviceContent"
import "./serviceLanding.css"
import "./arqiteqturuli.css"

const SITE_URL = "https://asymmetry.ge"

// Short, scannable hero bullets per page — replaces the long lead paragraph,
// mirroring the consultation page's compact style.
const HERO_BULLETS = {
  "arqiteqturuli-momsakhureba": [
    "იდეიდან პროექტის რეალიზებამდე ულიმიტო რენდერებით",
    "სრული არქიტექტურული მომსახურება ერთ გუნდში",
    "ნებისმიერი კლასისა და მოცულობის შენობის პროექტირება",
    "საავტორო ზედამხედველობა",
  ],
  "1-klasis-shenobis-proeqtireba": [
    "მცირე ობიექტი — გამარტივებული ნებართვის რეჟიმი",
    "სწრაფად და ოპტიმალურ ფასად",
    "სრული ტექნიკური დოკუმენტაცია",
    "ნებართვის/შეტყობინების პროცედურის თანხლება",
  ],
  "kerdzo-sakhlis-proeqtireba": [
    "ოცნების სახლი კონკრეტული ნაკვეთისთვის",
    "ესკიზური კონცეფციიდან სამუშაო ნახაზებამდე",
    "3D ვიზუალიზაცია და ხარჯთაღრიცხვა",
    "მშენებლობის ნებართვის თანხლება",
  ],
  "korpusis-proeqtireba": [
    "მრავალბინიანი და კომერციული ობიექტები",
    "ინსოლაცია და ნორმებთან სრული შესაბამისობა",
    "გეგმარებიდან კონსტრუქციამდე და ნებართვამდე",
    "დეველოპერული პროექტების გამოცდილება",
  ],
}

// the four "how we work" process steps — shown next to the price bubble
const ALL_STEPS = [
  { n: 1, label: "არქიტექტორის კონსულტაცია", slug: "konsultacia" },
  { n: 2, label: "კონცეფცია", slug: "koncefcia" },
  { n: 3, label: "პროექტის შეთანხმება & მშენებლობის ნებართვა", slug: "samushao-proeqti" },
  { n: 4, label: "ავტორის ზედამხედველობა", slug: "avtoris-zedamxedveloba" },
]

// "რატომ Asymmetry?" — intro + four differentiators shown as a thin-lined list
const WHY_INTRO =
  "კარგი სახლი იწყება თქვენი სურვილებისა და მიწის შესაძლებლობების სწორად გააზრებით. Asymmetry-ში გეხმარებით მთელი გზის გავლაში — პირველი იდეიდან პროექტის შეთანხმებამდე."
const WHY_ITEMS = [
  {
    n: "01",
    title: "ჯერ ვაფასებთ სამშენებლო პირობებს",
    text: "ვარკვევთ მიწის სამშენებლო პირობებსა და შეზღუდვებს, რათა პროექტირებამდე იცოდეთ, რისი განხორციელებაა შესაძლებელი და რა საჭიროებს დამატებით გადამოწმებას.",
  },
  {
    n: "02",
    title: "ვქმნით თქვენზე მორგებულ სახლს",
    text: "ვაერთიანებთ გამორჩეულ არქიტექტურასა და პრაქტიკულ გეგმარებას — თქვენი ცხოვრების წესის, მიწის თავისებურებებისა და სამშენებლო ბიუჯეტის გათვალისწინებით.",
  },
  {
    n: "03",
    title: "უშუალოდ მუშაობთ არქიტექტორთან",
    text: "თქვენს პროექტზე გადაწყვეტილებებს ერთად განვიხილავთ და თითოეულის მნიშვნელობას მარტივად გიხსნით.",
  },
  {
    n: "04",
    title: "წინასწარ იცით მომსახურების პირობები",
    text: "სამუშაოს დაწყებამდე ვათანხმებთ მომსახურების მოცულობას, ღირებულებასა და სამუშაო ვადებს. იცით, რას მოიცავს ჩვენი შეთავაზება და რა შეიძლება საჭიროებდეს დამატებით მომსახურებას.",
  },
]

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

// projects gallery fallback for pages without their own projectIds (process
// pages, engineering services) — keeps every page identical to the arch one.
const DEFAULT_PROJECT_IDS = [16, 3, 17, 6, 18, 7]

const ArqiteqturuliLanding = ({
  slug = "arqiteqturuli-momsakhureba",
  content,
  basePath = "/services",
}) => {
  const [openFaq, setOpenFaq] = useState(-1)
  // which intro columns are expanded (mobile accordion; always open on desktop)
  const [introOpen, setIntroOpen] = useState([])
  const toggleIntro = (i) =>
    setIntroOpen((o) =>
      o.includes(i) ? o.filter((x) => x !== i) : [...o, i]
    )
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
    window.dispatchEvent(
      new CustomEvent("asymmetry:contact", { detail: { call: true } })
    )
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
  const c = content || serviceContent[slug]
  // hero "list" per page: explicit bullets for the arch pages, otherwise the
  // first four "includes" titles of the page's own content.
  const heroBullets =
    HERO_BULLETS[slug] || (c.includes || []).slice(0, 4).map((x) => x.title)
  // video-slot poster = the page's own hero photo (kept per page)
  const poster = (c.hero && c.hero.image) || "/images/houses/h-8/1.jpg"

  // Service + BreadcrumbList + FAQPage JSON-LD (same as the shared template).
  useEffect(() => {
    const url = `${SITE_URL}${basePath}/${slug}/`
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
  }, [slug, basePath])

  // fade-up entrance reveal, matching the site (skipped during prerender to
  // avoid a hydration mismatch — same gate as the home-page headings)
  useEffect(() => {
    if (
      typeof navigator !== "undefined" &&
      navigator.userAgent === "ReactSnap"
    )
      return
    if (typeof IntersectionObserver === "undefined") return
    const els = document.querySelectorAll(".aq .aq-reveal")
    if (!els.length) return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in")
            io.unobserve(e.target)
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [slug])

  const projects = (c.projectIds || DEFAULT_PROJECT_IDS)
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

      <article className="sl aq">
        {/* ---------- HERO (cover background, video slot on the right) ---------- */}
        <header className="sl-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy aq-reveal">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">მთავარი</Link>
                <Icon icon="mdi:chevron-right" />
                <Link to="/services">სერვისები</Link>
                <Icon icon="mdi:chevron-right" />
                <span>{c.hero.h1}</span>
              </nav>

              <span className="sl-eyebrow">{c.hero.eyebrow}</span>
              <h1 className="sl-h1">{c.hero.h1}</h1>
              {heroBullets.length ? (
                <ul className="aq-hero-list">
                  {heroBullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : (
                <p className="sl-lead">{c.hero.lead}</p>
              )}

              <div className="sl-hero-cta">
                <button
                  type="button"
                  onClick={openContact}
                  className="sl-btn sl-btn--primary"
                >
                  <Icon icon="mdi:chat-outline" />
                  დაგვიკავშირდით
                </button>
                <Link to="/projects" className="sl-btn sl-btn--ghost">
                  <Icon icon="mdi:image-multiple-outline" />
                  ჩვენი პროექტები
                </Link>
              </div>

              <ul className="sl-hero-badges">
                {(c.hero.badges || [])
                  .filter((b) => b !== "საქართველოს მასშტაბით")
                  .map((b, i) => (
                  <li key={i}>
                    <Icon icon="mdi:check-decagram" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            {/* video slot — a real clip when the page has one, otherwise the
                page's own photo as a poster with a "coming soon" hint */}
            <div
              className={
                "aq-hero-video aq-hero-video--poster aq-reveal" +
                (c.hero.video ? " aq-hero-video--vid" : "")
              }
              aria-label="ვიდეო"
            >
              {c.hero.video ? (
                <video
                  className="aq-hero-poster"
                  src={c.hero.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                />
              ) : (
                <>
                  <img
                    className="aq-hero-poster"
                    src={poster}
                    alt={`Asymmetry — ${c.hero.h1}`}
                    loading="eager"
                  />
                  <div className="aq-video-ph">
                    <Icon icon="mdi:play-circle-outline" />
                    <span>ვიდეო მალე</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* ---------- NAV CARDS (current page highlighted) ---------- */}
        <div className="container">
          <div className="aq-nav aq-reveal">
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
          <section className="sl-section aq-intro aq-reveal">
            {c.sections.map((sec, i) => (
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
                  {sec.p.map((para, j) => (
                    <p className="sl-p" key={j}>
                      {para}
                    </p>
                  ))}
                  {sec.steps && (
                    <ol className="aq-steps">
                      {sec.steps.map((st, j) => (
                        <li className="aq-step" key={j}>
                          <span className="aq-step-n">{st.n}</span>
                          <span className="aq-step-body">
                            <b>{st.title}</b>
                            <span>{st.text}</span>
                          </span>
                        </li>
                      ))}
                    </ol>
                  )}
                  {sec.outro && <p className="sl-p">{sec.outro}</p>}
                </div>
              </div>
            ))}
          </section>

          {/* ---------- CLASSES (left, vertical) + PRICE & HOW-WE-WORK (right) ----
               desktop: two columns; mobile: everything stacks in DOM order ---- */}
          <section className="sl-section aq-cp aq-reveal">
            <div className="aq-cp-grid">
              <div className="aq-cp-classes">
                <div className="aq-class-grid">
                  <h2 className="aq-class-head">
                    შენობის კლასები და ვადები
                  </h2>
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
                <div className="aq-price aq-reveal">
                  <span className="aq-price-badge">
                    <Icon icon="mdi:calculator-variant-outline" />
                  </span>
                  <h2 className="aq-price-t">ფასის დათვლა</h2>
                  <p className="aq-price-sub">
                    შეავსეთ ორი ველი — ფასს მოგწერთ WhatsApp-ზე ან Messenger-ზე
                  </p>
                  <form className="aq-price-form" onSubmit={submitPrice}>
                    <div className="aq-price-field">
                      <label htmlFor="aqp-cad">მიწის საკადასტრო კოდი</label>
                      <div className="aq-price-input">
                        <Icon icon="mdi:barcode" />
                        <input
                          id="aqp-cad"
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
                      <label htmlFor="aqp-sqm">შენობის საშუალო კვადრატულობა (მ²)</label>
                      <div className="aq-price-input">
                        <Icon icon="mdi:home-outline" />
                        <input
                          id="aqp-sqm"
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

                <div className="aq-steps-bubble aq-reveal">
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

          {/* ---------- WHY ASYMMETRY (left copy + real project; right 01–04) ---------- */}
          <section className="sl-section aq-why aq-reveal" aria-labelledby="aq-why-h">
            <div className="aq-why-grid">
              <div className="aq-why-left">
                <h2 className="aq-h2 aq-h2--left" id="aq-why-h">
                  რატომ Asymmetry?
                </h2>
                <p className="aq-why-intro">{WHY_INTRO}</p>
                {projects[0] && (
                  <Link
                    to={`/projects/${projects[0].id}`}
                    className="aq-why-media"
                  >
                    <img
                      src={projects[0].images[0]}
                      alt={`Asymmetry-ის პროექტი — ${projects[0].name}`}
                      loading="lazy"
                    />
                    <span className="aq-why-media-cap">
                      {projects[0].name}
                    </span>
                  </Link>
                )}
              </div>

              <ol className="aq-why-list">
                {WHY_ITEMS.map((it) => (
                  <li className="aq-why-item" key={it.n}>
                    <span className="aq-why-n">{it.n}</span>
                    <div className="aq-why-body">
                      <h3 className="aq-why-t">{it.title}</h3>
                      <p className="aq-why-p">{it.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="aq-why-cta">
              <p className="aq-why-cta-text">
                გეგმავთ სახლის აშენებას ან მიწის შეძენას? დავიწყოთ უფასო
                კონსულტაციით.
              </p>
              <div className="aq-why-cta-actions">
                <Link
                  to="/contact"
                  className="sl-btn sl-btn--primary sl-btn--lg"
                >
                  <Icon icon="mdi:message-text-outline" />
                  მიიღეთ უფასო კონსულტაცია
                </Link>
                <Link to="/projects" className="aq-why-cta-link">
                  ნახეთ ჩვენი პროექტები
                  <Icon icon="mdi:arrow-right" />
                </Link>
              </div>
            </div>
          </section>

          {/* ---------- PROJECTS GALLERY ---------- */}
          {projects.length > 0 && (
            <section className="sl-section aq-reveal">
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
            <section className="sl-section aq-reveal" aria-label="ხშირად დასმული კითხვები">
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
        <section className="sl-cta-band aq-reveal">
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
      </article>
    </>
  )
}

export default ArqiteqturuliLanding
