import React from "react"
import { Link } from "react-router-dom"
import "./homeIntro.css"

// Keyword-rich intro block right under the hero. Gives the home page real
// on-page text + internal links with descriptive anchors, so the target
// phrases (არქიტექტურული პროექტი / პროექტირება / მშენებლობის ნებართვა …) are
// reinforced on the site's strongest page.
const links = [
  { to: "/services/arqiteqturuli-momsakhureba", text: "არქიტექტურული მომსახურება" },
  { to: "/services/kerdzo-sakhlis-proeqtireba", text: "კერძო სახლის პროექტირება" },
  { to: "/services/korpusis-proeqtireba", text: "კორპუსის პროექტირება" },
  { to: "/services/1-klasis-shenobis-proeqtireba", text: "1 კლასის შენობის პროექტირება" },
  { to: "/services/konstruqciuli-momsakhureba", text: "კონსტრუქციული მომსახურება" },
  { to: "/services", text: "ყველა სერვისი" },
]

const HomeIntro = () => {
  return (
    <section className="home-intro" aria-label="არქიტექტურული მომსახურება">
      <div className="container">
        <h2 className="hi-title">სრული არქიტექტურული მომსახურება საქართველოში</h2>
        <span className="hi-rule" />
        <p className="hi-text">
          <b>Asymmetry</b> — არქიტექტურული სტუდია, რომელიც გთავაზობთ სრულ
          არქიტექტურულ მომსახურებას: იდეის კონცეფციიდან დეტალურ არქიტექტურულ
          პროექტამდე, პროექტის შეთანხმებამდე და მშენებლობის ნებართვის აღებამდე.
          გამოცდილი არქიტექტორის გუნდი ასრულებს კერძო სახლის პროექტირებას,
          კორპუსის პროექტირებას და 1 კლასის შენობის პროექტს, ასევე კონსტრუქციულ,
          გეოლოგიურ და გეოდეზიურ მომსახურებას — ერთ სივრცეში, ხარისხზე
          ორიენტირებული პროექტირებით.
        </p>
        <nav className="hi-links" aria-label="სერვისები">
          {links.map((l) => (
            <Link key={l.to} to={l.to} className="hi-chip">
              {l.text}
            </Link>
          ))}
        </nav>
      </div>
    </section>
  )
}

export default HomeIntro
