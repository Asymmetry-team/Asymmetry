import React, { useState, useEffect } from "react"
import { Icon } from "@iconify/react"
import "./serviceFaq.css"

// Collapsible FAQ block for a service page. The answers are keyword-rich and
// live in the HTML (prerendered), so they are fully indexed by Google even
// though they're visually collapsed — this is NOT hidden/cloaked text, it's an
// expandable section, which Google indexes at full weight. Also emits FAQPage
// JSON-LD for rich results.
const buildFaqs = (name, details) => {
  const list = [
    {
      q: `რა ღირს ${name}?`,
      a: `ფასი დამოკიდებულია ობიექტის ფართობსა და პროექტის სირთულეზე. ზუსტ, ინდივიდუალურ შეთავაზებას უფასო კონსულტაციის შემდეგ მიიღებთ — დაგვიკავშირდით და ფასს გამოგითვლით.`,
    },
    {
      q: `რამდენ ხანში სრულდება ${name}?`,
      a: `ვადა დამოკიდებულია პროექტის მოცულობაზე. საშუალოდ საპროექტო დოკუმენტაცია 3–6 კვირაში მზადდება; ზუსტ ვადას კონსულტაციაზე შევათანხმებთ.`,
    },
    {
      q: `მოიცავს თუ არა მშენებლობის ნებართვის აღებას?`,
      a: `დიახ. Asymmetry უზრუნველყოფს პროექტის შესაბამის ორგანოებთან შეთანხმებასა და მშენებლობის ნებართვის აღებას — სრული არქიტექტურული მომსახურება ერთ სივრცეში.`,
    },
    {
      q: `მუშაობთ თბილისის გარეთ?`,
      a: `დიახ, ვმუშაობთ თბილისში და საქართველოს მასშტაბით, ასევე დისტანციურ პროექტებზე.`,
    },
  ]
  if (details && details.length) {
    list.push({
      q: `რას მოიცავს ${name}?`,
      a: `${name} მოიცავს: ${details.join(", ")}. თითოეული ეტაპი ხარისხზე ორიენტირებულად, გამოცდილი არქიტექტორის გუნდის მიერ სრულდება.`,
    })
  }
  return list
}

const ServiceFaq = ({ name, details }) => {
  const [open, setOpen] = useState(-1)
  const faqs = buildFaqs(name, details)

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
    el.setAttribute("data-servicefaq-ld", "1")
    el.textContent = JSON.stringify(ld)
    document.head.appendChild(el)
    return () => el.remove()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name])

  return (
    <section className="sfaq" aria-label="ხშირად დასმული კითხვები">
      <h2 className="sd-h2">ხშირად დასმული კითხვები</h2>
      <div className="sfaq-list">
        {faqs.map((f, i) => (
          <div className={`sfaq-item ${open === i ? "open" : ""}`} key={i}>
            <button
              className="sfaq-q"
              onClick={() => setOpen(open === i ? -1 : i)}
              aria-expanded={open === i}
            >
              <span>{f.q}</span>
              <Icon icon="mdi:chevron-down" className="sfaq-chevron" />
            </button>
            {/* answer stays in the DOM (collapsed via CSS) so Google indexes it */}
            <div className="sfaq-a">
              <p>{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ServiceFaq
