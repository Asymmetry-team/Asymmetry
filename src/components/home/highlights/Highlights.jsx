import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import { useLang } from "../../../i18n"
import "./highlights.css"

const reviews = [
  {
    text: "პროცესის ყველა ეტაპზე გვრჩებოდა განცდა, რომ საიმედო ხელში ვართ. შედეგმა მოლოდინს გადააჭარბა.",
    name: "ნინო კ.",
    role: "საცხოვრებელი სახლი · დიღომი",
    initial: "ნ",
  },
  {
    text: "დეტალებზე ისეთი ყურადღება, როგორსაც ვერსად ვხვდებოდი. რეკომენდაციას ვუწევ ყველას.",
    name: "გიორგი მ.",
    role: "ინტერიერი · საბურთალო",
    initial: "გ",
  },
  {
    text: "ბიუჯეტში ჩავეტიეთ, ვადებში ჩავეტიეთ, და ყველაზე მთავარი — მიყვარს ჩემი სახლი.",
    name: "თამარ ბ.",
    role: "აგარაკი · მცხეთა",
    initial: "თ",
  },
]

const faqs = [
  {
    q: "რამდენი ღირს არქიტექტურული პროექტი?",
    a: "ფასი დამოკიდებულია ფართობსა და პროექტის მოცულობაზე. ზუსტ შეთავაზებას უფასო კონსულტაციის შემდეგ გაძლევთ.",
  },
  {
    q: "რამდენი ხანი სჭირდება პროექტს?",
    a: "საპროექტო დოკუმენტაცია საშუალოდ 4–6 კვირაა, სრული რეალიზაცია — სივრცის მიხედვით.",
  },
  {
    q: "მუშაობთ თბილისის გარეთ?",
    a: "დიახ, ვმუშაობთ საქართველოს მასშტაბით და დისტანციურ პროექტებზეც.",
  },
  {
    q: "მოიცავს თუ არა მშენებლობის ნებართვას?",
    a: "დიახ — გთავაზობთ სრულ მომსახურებას პროექტიდან ნებართვის აღებამდე.",
  },
]

const Highlights = () => {
  const { t, tr } = useLang()
  const [open, setOpen] = useState(-1)
  const reviewsRef = useRef(null)
  const sectionRef = useRef(null)

  // same scroll fade-up reveal as the blog / projects cards
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

  const scrollReviews = (dir) => {
    const el = reviewsRef.current
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: "smooth" })
  }

  // FAQPage structured data → eligible for Google's FAQ rich results.
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    }
    const el = document.createElement("script")
    el.type = "application/ld+json"
    el.setAttribute("data-faq-ld", "1")
    el.textContent = JSON.stringify(ld)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <section className="highlights padding" id="home-highlights" ref={sectionRef}>
      <div className="container">
        <div className="highlights-grid">
          {/* LEFT — testimonials bubble */}
          <div className="hl-col">
            <div className="bubble hl-bubble reveal-card">
              <div className="bubble-head">
                <span className="bubble-title">{t("home.reviews")}</span>
              </div>
              <div className="reviews-stage">
                <button
                  className="reviews-arrow reviews-arrow--left"
                  onClick={() => scrollReviews(-1)}
                  aria-label="წინა"
                >
                  <Icon icon="mdi:chevron-left" />
                </button>
                <div className="reviews" ref={reviewsRef}>
                  {reviews.map((r, i) => (
                    <div className="review-card" key={i}>
                      <div className="review-stars">
                        <Icon icon="mdi:star" />
                        <Icon icon="mdi:star" />
                        <Icon icon="mdi:star" />
                        <Icon icon="mdi:star" />
                        <Icon icon="mdi:star" />
                      </div>
                      <p className="review-text">{tr(r.text)}</p>
                      <div className="review-who">
                        <span className="review-av">{r.initial}</span>
                        <span>
                          <b>{tr(r.name)}</b>
                          <i>{tr(r.role)}</i>
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <button
                  className="reviews-arrow reviews-arrow--right"
                  onClick={() => scrollReviews(1)}
                  aria-label="შემდეგი"
                >
                  <Icon icon="mdi:chevron-right" />
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT — FAQ bubble */}
          <div className="hl-col">
            <div className="bubble hl-bubble reveal-card">
              <div className="bubble-head">
                <span className="bubble-title">{t("home.faq")}</span>
              </div>
              <div className="faq">
                {faqs.map((f, i) => (
                  <div
                    className={`faq-item ${open === i ? "open" : ""}`}
                    key={i}
                  >
                    <button
                      className="faq-q"
                      onClick={() => setOpen(open === i ? -1 : i)}
                      aria-expanded={open === i}
                    >
                      <span>{tr(f.q)}</span>
                      <Icon icon="mdi:chevron-down" className="faq-chevron" />
                    </button>
                    <div className="faq-a">
                      <span className="faq-divider" />
                      <p>{tr(f.a)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Highlights
