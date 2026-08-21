import React from "react"
import "./partners.css"

// Partner/brand logos. Placeholder SVGs live in /public/images/partners/ —
// replace each file (keep the name) or edit this list to add real logos.
const partners = [
  { name: "Studio", logo: "/images/partners/studio.svg" },
  { name: "Décor", logo: "/images/partners/decor.svg" },
  { name: "Ceramiq", logo: "/images/partners/ceramiq.svg" },
  { name: "Lumen", logo: "/images/partners/lumen.svg" },
  { name: "Terra", logo: "/images/partners/terra.svg" },
  { name: "Nordic", logo: "/images/partners/nordic.svg" },
]

const Partners = () => {
  return (
    <section className="partners" aria-label="პარტნიორები">
      <div className="container">
        <p className="partners-label">გვენდობიან</p>
        <div className="partners-row">
          {partners.map((p, i) => (
            <img
              key={i}
              className="partner-logo"
              src={p.logo}
              alt={p.name}
              loading="lazy"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Partners
