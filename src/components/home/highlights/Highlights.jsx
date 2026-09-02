import React, { useState, useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import { useLang } from "../../../i18n"
import "./highlights.css"

const reviews = [
  {
    text: "კერძო სახლის პროექტირება თავიდან ბოლომდე ასიმეტრიამ გააკეთა — არქიტექტურული პროექტიდან მშენებლობის ნებართვის აღებამდე. პროცესის ყველა ეტაპზე გვრჩებოდა განცდა, რომ საიმედო ხელში ვართ.",
    name: "ნინო კ.",
    role: "კერძო სახლის პროექტირება · დიღომი",
    initial: "ნ",
  },
  {
    text: "ინტერიერის დიზაინზე ისეთი ყურადღება დეტალებზე, როგორსაც ვერსად ვხვდებოდი. 3D ვიზუალიზაციამ საშუალება მომცა, სახლი მშენებლობამდე მენახა. რეკომენდაციას ვუწევ ყველას.",
    name: "გიორგი მ.",
    role: "ინტერიერის დიზაინი · საბურთალო",
    initial: "გ",
  },
  {
    text: "ბიუჯეტში ჩავეტიე, ვადებში ჩავეტიე, და ყველაზე მთავარი — მიყვარს ჩემი სახლი. სრული არქიტექტურული მომსახურება ერთ ადგილას ბევრ ნერვს დამიზოგა.",
    name: "თამარ ბ.",
    role: "აგარაკის პროექტი · მცხეთა",
    initial: "თ",
  },
  {
    text: "კორპუსის პროექტირება და შესაბამის ორგანოებთან პროექტის შეთანხმება უპრობლემოდ წარიმართა. პროფესიონალი გუნდი, რომელმაც მთელი ბიუროკრატია თავის თავზე აიღო.",
    name: "ლევან გ.",
    role: "კორპუსის პროექტირება · ვაკე",
    initial: "ლ",
  },
  {
    text: "კონსტრუქციული პროექტი და გეოლოგიური დასკვნა ზუსტად ვადაში მივიღე. საძირკვლის გათვლებში სრული ნდობა მქონდა — ყველაფერი ნორმებით გაკეთდა.",
    name: "დავით ხ.",
    role: "კონსტრუქციული პროექტი · ბათუმი",
    initial: "დ",
  },
  {
    text: "მიწის ნაკვეთის ანალიზით დავიწყეთ და თავიდანვე ვიცოდი, რამდენის აშენება შემეძლო. ამან ბევრი ზედმეტი ხარჯი ამარიდა. ნამდვილი არქიტექტურული მომსახურება.",
    name: "სალომე რ.",
    role: "საცხოვრებელი სახლი · გლდანი",
    initial: "ს",
  },
  {
    text: "მშენებლობის ნებართვა ისე მივიღეთ, რომ ერთი დღეც არ დამიკარგავს მერიაში სირბილში. ყველა ეტაპს ასიმეტრიის გუნდი უძღვებოდა.",
    name: "ირაკლი ტ.",
    role: "მშენებლობის ნებართვა · რუსთავი",
    initial: "ი",
  },
  {
    text: "პროექტის შეთანხმება რამდენიმე ეტაპად მიმდინარეობდა და ყოველ ნაბიჯზე ნათლად მიხსნიდნენ, რა ხდებოდა. გამჭვირვალე პროცესი და შესანიშნავი შედეგი.",
    name: "მარიამ ლ.",
    role: "სახლის პროექტი · კრწანისი",
    initial: "მ",
  },
  {
    text: "1 კლასის შენობის პროექტირება სწრაფად და მარტივად გაკეთდა. მცირე სახლისთვისაც კი ისეთი ხარისხი, თითქოს დიდ ობიექტზე მუშაობდნენ.",
    name: "ანა შ.",
    role: "1 კლასის შენობა · ყაზბეგი",
    initial: "ა",
  },
]

const faqs = [
  {
    q: "რამდენი ღირს არქიტექტურული პროექტი და კერძო სახლის პროექტირება?",
    a: "არქიტექტურული პროექტის ფასი დამოკიდებულია შენობის ფართობზე, კლასზე (I, II თუ III), მიწის ნაკვეთის პირობებსა და პროექტის მოცულობაზე — გეგმარება, ფასადები, ჭრილები, 3D ვიზუალიზაცია, კონსტრუქციული და საინჟინრო ნაწილები. ერთი და იმავე ფართობის ორი სახლის ფასი ხშირად სწორედ ნაკვეთის გამო განსხვავდება. ზუსტ შეთავაზებას უფასო კონსულტაციის შემდეგ გაძლევთ, სადაც დეტალურად გავწერთ, რა შედის ფასში.",
  },
  {
    q: "როგორ ავიღო მშენებლობის ნებართვა საქართველოში?",
    a: "მშენებლობის ნებართვის აღება რამდენიმე ეტაპად მიმდინარეობს: ჯერ დგინდება მიწის სამშენებლო პირობები, შემდეგ მზადდება და შესათანხმებლად წარედგინება არქიტექტურული და კონსტრუქციული პროექტი, ბოლოს კი გაიცემა მშენებლობის ნებართვა. ასიმეტრია სრულ პროცესს უძღვება — თქვენ მერიაში სირბილი აღარ დაგჭირდებათ.",
  },
  {
    q: "რამდენ ხანს გრძელდება არქიტექტურული პროექტის შეთანხმება?",
    a: "საპროექტო დოკუმენტაცია საშუალოდ 4–6 კვირაში მზადდება. მერიაში შეთანხმების ოფიციალური ვადა კი კლასზეა დამოკიდებული: I კლასის (60 მ²-მდე) სახლი ხშირად ~1 კვირა–1 თვე, II კლასის (60–500 მ²) პროექტი პრაქტიკაში ~3–4 თვე. მომზადებისა და შეთანხმების დროები ცალკე უნდა გაითვალოთ.",
  },
  {
    q: "რა შედის სრულ არქიტექტურულ მომსახურებაში?",
    a: "სრული არქიტექტურული მომსახურება მოიცავს ყველა ეტაპს ერთ სივრცეში: მიწის ნაკვეთის ანალიზი, არქიტექტურული პროექტი და გეგმარება, 3D ვიზუალიზაცია, კონსტრუქციული, გეოლოგიური და გეოდეზიური ნაწილები, ინტერიერის დიზაინი, პროექტის შეთანხმება შესაბამის ორგანოებთან და მშენებლობის ნებართვის აღება. ერთი გუნდი — ერთი პასუხისმგებლობა.",
  },
  {
    q: "რა განსხვავებაა I, II და III კლასის შენობებს შორის?",
    a: "შენობის კლასი განსაზღვრავს პროექტისა და შეთანხმების სირთულეს. I კლასი — 60 მ²-მდე, ყველაზე მარტივი პროცესი; II კლასი — 60–500 მ², ყველაზე გავრცელებული კერძო სახლებისთვის, რამდენიმეეტაპიანი; III კლასი — 500–5000 მ², მასშტაბური და ყველაზე კომპლექსური. კლასს მხოლოდ ფართობი კი არა, სიმაღლე და მიწისქვეშა ნაწილიც განსაზღვრავს.",
  },
  {
    q: "რამდენის აშენება შემიძლია ჩემს მიწის ნაკვეთზე?",
    a: "ეს დამოკიდებულია ნაკვეთის ზონასა და განაშენიანების კოეფიციენტებზე — K1 (რა ფართს ფარავს შენობა მიწაზე) და K2 (ჯამში რამდენი კვადრატის აშენება შეიძლება ყველა სართულზე). სანამ დიზაინს დაიწყებთ, ჩვენ შევამოწმებთ საკადასტრო მონაცემებს და გეტყვით, რა და რამდენის აშენება შეგიძლიათ რეალურად.",
  },
  {
    q: "მუშაობთ თბილისის გარეთ და დისტანციურად?",
    a: "დიახ, ვმუშაობთ მთელი საქართველოს მასშტაბით — თბილისი, ბათუმი, ქუთაისი, რუსთავი და რეგიონები. მომსახურებას გთავაზობთ როგორც ოფისში, ისე ონლაინ და ადგილზე ვიზიტით, ხოლო სამუშაოს ხარისხს ხელშეკრულებით ვუზრუნველყოფთ.",
  },
  {
    q: "რა არის კონსტრუქციული პროექტი და რატომ სჭირდება სახლს?",
    a: "კონსტრუქციული პროექტი განსაზღვრავს შენობის სიმტკიცესა და უსაფრთხოებას — საძირკველს, კედლებს, გადახურვას და ყველა მზიდ ელემენტს. ის მშენებლობის ნებართვის აუცილებელი ნაწილია და გეოლოგიურ დასკვნას ეყრდნობა. ასიმეტრია არქიტექტურულ და კონსტრუქციულ პროექტს ერთ პაკეტში გთავაზობთ, რაც კოორდინაციას და დროს ზოგავს.",
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
                <span className="bubble-title grad-head grad-head-6">{t("home.reviews")}</span>
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
                <span className="bubble-title grad-head grad-head-7">{t("home.faq")}</span>
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
