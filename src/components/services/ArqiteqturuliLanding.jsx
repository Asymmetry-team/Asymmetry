import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { list } from "../data/Data"
import { serviceContent } from "./serviceContent"
import HeroVideo from "./HeroVideo"
import ProjectsCarousel from "./ProjectsCarousel"
import Partners from "../home/partners/Partners"
import googleReviews from "../../data/googleReviews.json"
import "./serviceLanding.css"
import "./arqiteqturuli.css"

// real Google reviews (baked in at build time) with a small fallback, for the
// compact "შეფასებები" bubble beside "how we work"
const FALLBACK_REVIEWS = [
  {
    text: "სწრაფი, დახვეწილი, გემოვნებიანი — ბიუჯეტური, ხარისხიანი და სანდო.",
    name: "Armazi Dundua",
    role: "Google",
  },
  {
    text: "პროფესიონალური მიდგომა, პასუხისმგებლობა და ხარისხი. რეკომენდაციას ვუწევ.",
    name: "Inga Vatchridze",
    role: "Google",
  },
]
const REVIEWS =
  Array.isArray(googleReviews) && googleReviews.length
    ? googleReviews
    : FALLBACK_REVIEWS

const SITE_URL = "https://asymmetry.ge"

// The three specialised offshoot pages. They were pulled out of the main
// /services grid and the home page to keep those focused, but stay reachable
// (and internally linked, for SEO) as quick links at the very bottom of every
// architecture service page and every "how we work" process page.
const CLUSTER_LINKS = [
  "fasadis-daproeqteba",
  "interieris-dizaini",
  "kotejis-agarakis-proeqti",
]

// Short, scannable hero bullets per page — replaces the long lead paragraph,
// mirroring the consultation page's compact style.
const HERO_BULLETS = {
  "arqiteqturuli-momsakhureba": [
    "იდეიდან პროექტის შეთანხმებამდე ულიმიტო რენდერებით",
    "სრული არქიტექტურული მომსახურება ერთ გუნდში",
    "ნებისმიერი კლასისა და მოცულობის შენობის პროექტირება",
    "საავტორო ზედამხედველობა პროექტის მშენებლობისას",
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
  { n: 1, label: "კონსულტაცია", slug: "konsultacia" },
  { n: 2, label: "კონცეფცია", slug: "koncefcia" },
  { n: 3, label: "საქმის წარმოება მერიასთან", slug: "samushao-proeqti" },
  { n: 4, label: "ზედამხედველობა", slug: "avtoris-zedamxedveloba" },
]

// "რატომ Asymmetry?" — intro + four differentiators shown as a thin-lined list
// Neutral default intro for the "why us" block — used by every page that does
// NOT define its own `whyIntro`. It deliberately avoids the main arch page's
// target terms ("არქიტექტურული მომსახურება/პროექტი") so the class & engineering
// pages don't compete with it; the arch page supplies its own richer whyIntro.
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
    label: "3/4 კლასის პროექტი",
    sub: "500-6000+ კვ.მ",
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
    area: "500–6000 კვ.მ",
    height: "22 მ",
    times: [{ p: "დამოკიდებულია პროექტზე", v: "ინდივიდუალური" }],
  },
  {
    title: "IV კლასი",
    icon: "mdi:city-variant-outline",
    area: "6000 კვ.მ-დან",
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
  // intro accordions COLLAPSED by default on mobile (user expands them); on
  // desktop the CSS keeps them open regardless of this state
  const [introOpen, setIntroOpen] = useState([])
  const toggleIntro = (i) =>
    setIntroOpen((o) =>
      o.includes(i) ? o.filter((x) => x !== i) : [...o, i]
    )
  // long-form SEO blocks — collapsed by default. On mobile each block toggles on
  // its own (dark bar); on desktop the whole PAIR (one bubble) opens together.
  const [seoOpen, setSeoOpen] = useState([])
  const toggleSeo = (i) => {
    const total = (content || serviceContent[slug])?.seoBlocks?.length || 0
    const desktop =
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 901px)").matches
    setSeoOpen((o) => {
      if (desktop) {
        const start = i - (i % 2)
        const pair = [start, start + 1].filter((x) => x < total)
        const allOpen = pair.every((x) => o.includes(x))
        return allOpen
          ? o.filter((x) => !pair.includes(x))
          : [...new Set([...o, ...pair])]
      }
      return o.includes(i) ? o.filter((x) => x !== i) : [...o, i]
    })
  }
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
  // "რატომ Asymmetry?" — use each page's own advantages so the section is
  // unique per page (falls back to the generic four differentiators)
  const whyItems =
    c.advantages && c.advantages.length
      ? c.advantages.slice(0, 5).map((a, i) => ({
          n: String(i + 1).padStart(2, "0"),
          title: a.title,
          text: a.text,
        }))
      : WHY_ITEMS
  // per-page intro (arch page has its own richer copy; the rest fall back to the
  // neutral default so they don't repeat the arch page's SEO terms)
  const whyIntro = c.whyIntro || WHY_INTRO

  // Service + BreadcrumbList + FAQPage JSON-LD (same as the shared template).
  useEffect(() => {
    const url = `${SITE_URL}${basePath}/${slug}/`
    const blocks = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: c.hero.h1,
        serviceType: c.hero.h1,
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

  // cap the reviews bubble to the classes-column height so it never spills below
  // it — its list scrolls inside. Desktop only (on mobile it's hidden).
  useEffect(() => {
    const sync = () => {
      const grid = document.querySelector(".aq-cp-grid")
      if (!grid) return
      const classesCol = grid.querySelector(".aq-cp-classes")
      const cpSide = grid.querySelector(".aq-cp-side")
      const bubble = grid.querySelector(".aq-reviews-bubble")
      if (!classesCol || !cpSide || !bubble) return
      if (window.matchMedia("(max-width: 900px)").matches) {
        bubble.style.maxHeight = ""
        return
      }
      // measure the classes column's natural height with the bubble collapsed
      bubble.style.maxHeight = "0px"
      void grid.offsetHeight
      const classesH = classesCol.getBoundingClientRect().height
      const offset =
        bubble.getBoundingClientRect().top - cpSide.getBoundingClientRect().top
      bubble.style.maxHeight = Math.max(240, Math.round(classesH - offset)) + "px"
    }
    sync()
    const t = setTimeout(sync, 400) // re-measure after fonts/images settle
    window.addEventListener("resize", sync)
    return () => {
      clearTimeout(t)
      window.removeEventListener("resize", sync)
    }
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

      <article
        className={`sl aq${
          slug === "arqiteqturuli-momsakhureba" ? " aq--main" : ""
        }`}
      >
        {/* ---------- HERO (cover background, video slot on the right) ---------- */}
        <header className="sl-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy aq-reveal">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">მთავარი</Link>
                <Icon icon="mdi:chevron-right" />
                <Link to="/services/">სერვისები</Link>
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
                <Link to="/projects/" className="sl-btn sl-btn--ghost">
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
                <HeroVideo src={c.hero.video} />
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
                  to={`/services/${n.slug}/`}
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
                  <p className="aq-price-q">
                    {c.priceQuestion || "რა ღირს არქიტექტურული პროექტი?"}
                  </p>
                  <p className="aq-price-sub">
                    შეავსეთ ველები — ფასს მოგწერთ
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
                        to={`/process/${s.slug}/`}
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

                {/* compact reviews — a 3rd bubble so "how we work" isn't stretched
                    tall next to the (4-class) classes column */}
                <div className="aq-reviews-bubble aq-reveal">
                  <div className="aq-reviews-head">
                    <h2 className="aq-h2">შეფასებები</h2>
                    <a
                      className="aq-reviews-badge"
                      href="https://search.google.com/local/reviews?placeid=ChIJ_fVicwBzREARKWBmbZjnBd4"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Google შეფასებები"
                    >
                      <Icon icon="mdi:google" />
                      <b>5.0</b>
                      <Icon icon="mdi:star" className="aq-reviews-star" />
                    </a>
                  </div>
                  <div className="aq-reviews-list">
                    {REVIEWS.map((r, i) => (
                      <div className="aq-review" key={i}>
                        <div className="aq-review-stars">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Icon key={s} icon="mdi:star" />
                          ))}
                        </div>
                        <p className="aq-review-text">{r.text}</p>
                        <div className="aq-review-who">
                          <span className="aq-review-av">
                            {r.initial || (r.name || "?").trim()[0]}
                          </span>
                          <span className="aq-review-meta">
                            <b>{r.name}</b>
                            <i>{r.role}</i>
                          </span>
                        </div>
                      </div>
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
                <p className="aq-why-intro">{whyIntro}</p>
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
                {whyItems.map((it) => (
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
          </section>

          {/* "გეგმავთ სახლის აშენებას…" CTA — sits here on desktop (right after
              "why us"); on mobile CSS `order` moves it between FAQ and related */}
          <div className="aq-why-cta">
            <p className="aq-why-cta-text">
              გეგმავთ სახლის აშენებას ან მიწის შეძენას? დავიწყოთ უფასო
              კონსულტაციით.
            </p>
            <div className="aq-why-cta-actions">
              <Link to="/contact/" className="sl-btn sl-btn--primary sl-btn--lg">
                <Icon icon="mdi:message-text-outline" />
                მიიღეთ უფასო კონსულტაცია
              </Link>
              <Link to="/projects/" className="aq-why-cta-link">
                ნახეთ ჩვენი პროექტები
                <Icon icon="mdi:arrow-right" />
              </Link>
            </div>
          </div>

          {/* ---------- LONG-FORM SEO CONTENT (below "why us") ---------- */}
          {c.seoBlocks && c.seoBlocks.length > 0 && (
            <section
              className="sl-section aq-reveal aq-seo"
              aria-label="არქიტექტურული მომსახურების შესახებ"
            >
              {/* group the blocks into PAIRS — each pair is one bubble holding
                  two texts side by side (like the intro), pairs stacked below */}
              {Array.from(
                { length: Math.ceil(c.seoBlocks.length / 2) },
                (_, pi) => (
                  <div className="aq-seo-pair" key={pi}>
                    {c.seoBlocks.slice(pi * 2, pi * 2 + 2).map((b, k) => {
                      const i = pi * 2 + k
                      return (
                        <div
                          className={`aq-seo-block ${
                            seoOpen.includes(i) ? "open" : ""
                          }`}
                          key={i}
                        >
                          <button
                            type="button"
                            className="aq-seo-head"
                            onClick={() => toggleSeo(i)}
                            aria-expanded={seoOpen.includes(i)}
                          >
                            {b.h3 && <h3 className="aq-seo-h">{b.h3}</h3>}
                            <Icon
                              icon="mdi:chevron-down"
                              className="aq-seo-chev"
                            />
                          </button>
                          <div className="aq-seo-body">
                            {b.p.map((para, j) => (
                              <p className="aq-seo-p" key={j}>
                                {para}
                              </p>
                            ))}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )
              )}
            </section>
          )}

          {/* projects + partners — on mobile their order is swapped (partners
              first) via CSS order on this wrapper */}
          <div className="aq-proj-partners">
            {/* ---------- PROJECTS GALLERY ---------- */}
            {projects.length > 0 && (
              <section className="sl-section aq-reveal aq-proj-sec">
                <div className="sl-projects-head">
                  <h2 className="sl-h2 sl-h2--flush">ჩვენი ნამუშევრები</h2>
                  <Link to="/projects/" className="sl-seeall">
                    ყველა პროექტი <Icon icon="mdi:arrow-right" />
                  </Link>
                </div>
                {/* same swipeable carousel as the home page (3 across + arrows on
                    desktop, swipe on mobile) */}
                <div className="carousel-bubble">
                  <ProjectsCarousel items={projects} />
                </div>
              </section>
            )}

            {/* ---------- CLIENTS / PARTNERS (trust signal) ---------- */}
            <section className="sl-section aq-reveal aq-partners-sec">
              <Partners variant="standalone" reveal={false} />
            </section>
          </div>

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
                      <span className="sl-faq-divider" />
                      <p>{f.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ---------- RELATED SERVICES (topic-cluster interlinking) ---------- */}
          {(() => {
            const rel = (c.related || [])
              .map((rs) => ({ slug: rs, page: serviceContent[rs] }))
              .filter((x) => x.page)
              .slice(0, 6)
            if (!rel.length) return null
            return (
              <section
                className="sl-section aq-reveal aq-related"
                aria-label="დაკავშირებული სერვისები"
              >
                <h2 className="aq-h2">დაკავშირებული სერვისები</h2>
                <div className="aq-related-grid">
                  {rel.map(({ slug: rs, page }) => (
                    <Link
                      to={`/services/${rs}/`}
                      className="aq-related-card"
                      key={rs}
                    >
                      <span className="aq-related-name">{page.hero.h1}</span>
                      <Icon icon="mdi:arrow-right" className="aq-related-arrow" />
                    </Link>
                  ))}
                </div>
              </section>
            )
          })()}

          {/* ---------- MORE DIRECTIONS — the three offshoot pages, linked at
               the very bottom of every architecture & process page ---------- */}
          {(() => {
            const links = CLUSTER_LINKS
              .filter((cs) => cs !== slug)
              .map((cs) => ({ slug: cs, page: serviceContent[cs] }))
              .filter((x) => x.page)
            if (!links.length) return null
            return (
              <section
                className="sl-section aq-reveal aq-related"
                aria-label="სხვა მიმართულებები"
              >
                <h2 className="aq-h2">სხვა მიმართულებები</h2>
                <div className="aq-related-grid">
                  {links.map(({ slug: cs, page }) => (
                    <Link
                      to={`/services/${cs}/`}
                      className="aq-related-card"
                      key={cs}
                    >
                      <span className="aq-related-name">{page.hero.h1}</span>
                      <Icon icon="mdi:arrow-right" className="aq-related-arrow" />
                    </Link>
                  ))}
                </div>
              </section>
            )
          })()}
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
              <Link to="/contact/" className="sl-btn sl-btn--primary sl-btn--lg">
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
