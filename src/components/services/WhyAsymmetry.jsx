import React from "react"
import { Link } from "react-router-dom"

// Shared "რატომ Asymmetry?" section — a calm 2-col block (copy + one real
// project on the left, a thin-lined 01–04 list on the right). Used by the
// architecture, consultation and process/service landing pages.
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

const WhyAsymmetry = ({ project }) => (
  <section className="sl-section aq-why aq-reveal" aria-labelledby="aq-why-h">
    <div className="aq-why-grid">
      <div className="aq-why-left">
        <h2 className="aq-h2 aq-h2--left" id="aq-why-h">
          რატომ Asymmetry?
        </h2>
        <p className="aq-why-intro">{WHY_INTRO}</p>
        {project && (
          <Link to={`/projects/${project.id}`} className="aq-why-media">
            <img
              src={project.images[0]}
              alt={`Asymmetry-ის პროექტი — ${project.name}`}
              loading="lazy"
            />
            <span className="aq-why-media-cap">{project.name}</span>
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
  </section>
)

export default WhyAsymmetry
