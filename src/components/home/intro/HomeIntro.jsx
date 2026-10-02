import React from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import { useLang } from "../../../i18n"
import "./homeIntro.css"

// Service capabilities shown as chips. Each links to the page that OWNS that
// keyword — so the home page mentions the term but passes its ranking weight to
// the dedicated service page (de-cannibalization: the home page targets brand
// terms, the service pages target the commercial "პროექტი/პროექტირება" terms).
const SERVICE_CHIPS = [
  { label: "60 კვადრატამდე შენობა", to: "/services/1-klasis-shenobis-proeqtireba/" },
  { label: "კერძო სახლის პროექტირება", to: "/services/kerdzo-sakhlis-proeqtireba/" },
  { label: "კორპუსის პროექტირება", to: "/services/korpusis-proeqtireba/" },
  { label: "გეოლოგიური პროექტი", to: "/services/geologiuri-momsakhureba/" },
  { label: "კონსტრუქციული პროექტი", to: "/services/konstruqciuli-momsakhureba/" },
  { label: "გეოდეზიური სამუშაოები", to: "/services/geodeziuri-samushaoebi/" },
]

// Keyword-rich intro block right under the hero. The paragraph is collapsed by
// default (clean UI) behind a "ვრცლად" toggle, but it stays in the HTML
// (prerendered), so Google indexes it at full weight — an expandable section,
// not hidden/cloaked text. The keyword-rich H2 stays visible.
const HomeIntro = () => {
  const { tr } = useLang()
  return (
    <section className="home-intro" aria-label="არქიტექტურული კომპანია ასიმეტრია">
      <div className="container">
        {/* always expanded (no toggle) — heading + content all inside the bubble */}
        <div className="hi-more open">
          <div className="hi-grid">
            <div className="hi-head">
              <h2 className="hi-title">
                {tr("არქიტექტურული კომპანია -")}{" "}
                <span className="hi-title-accent">{tr("ასიმეტრია")}</span>
                <span className="hi-title-sub">
                  {tr("არქიტექტურული სტუდია თბილისში")}
                </span>
              </h2>
              <span className="hi-rule" />
            </div>
            {/* left: the descriptive copy */}
            <div className="hi-col hi-col--text">
              <p className="hi-lead">
                <b>ASYMMETRY</b> — ასიმეტრია არის სანდო არქიტექტურული კომპანია და
                სტუდია თბილისში. 2019 წლიდან ჩვენი არქიტექტორების გუნდი ქმნის ინდივიდუალურ,
                პრემიუმ და ენერგოეფექტურ პროექტებს.
              </p>
              <p className="hi-lead">
                ჩვენ გვჯერა, რომ მაღალი ხარისხის არქიტექტურა ფინანსურად
                ხელმისაწვდომიც უნდა იყოს. ამიტომ გთავაზობთ პრემიუმ დიზაინსა და
                სანდო საინჟინრო პროექტებს გამჭვირვალე და კონკურენტულ ფასად —
                ხარისხისა და ღირებულების ოპტიმალური თანაფარდობით.
              </p>
              <p className="hi-note">
                ჩვენი არქიტექტურული ოფისი მდებარეობს თბილისში, წერეთლის გამზირი N116-ში —
                „დიდუბე პლაზა, რადიუსი“. თანამშრომლობა ფორმდება ხელშეკრულებით,
                სრული უფლებებისა და პირობების დაცვით.
              </p>
            </div>

            {/* right: the process steps + service chips */}
            <div className="hi-col hi-col--lists">
              <p className="hi-sub-label">{tr("მომსახურების ეტაპები")}</p>
              <ol className="hi-steps" aria-label="მომსახურების ეტაპები">
                {[
                  "კონსულტაცია",
                  "ესკიზის დამუშავება",
                  "ხელშეკრულების გაფორმება",
                  "პროექტის შეთანხმება",
                  "მშენებლობის ნებართვა",
                  "ზედამხედველობა",
                ].map((s, i) => (
                  <li className="hi-step" key={i}>
                    <span className="hi-step-n">{i + 1}</span>
                    <span>{tr(s)}</span>
                  </li>
                ))}
              </ol>

              <p className="hi-sub-label hi-sub-label--gap">{tr("ვასრულებთ")}</p>
              <div className="hi-chips">
                {SERVICE_CHIPS.map((c, i) => (
                  <Link className="hi-chip" to={c.to} key={i}>
                    {tr(c.label)}
                  </Link>
                ))}
              </div>

              {/* main-service link — same quiet chip style as the list above,
                  set off by a faint divider (an internal link to the page that
                  should own "არქიტექტურული მომსახურება") */}
              <div className="hi-service-row">
                <Link
                  to="/services/arqiteqturuli-momsakhureba/"
                  className="hi-chip hi-chip--service"
                >
                  {tr("არქიტექტურული მომსახურება")}
                  <Icon icon="mdi:arrow-right" className="hi-service-link-ico" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HomeIntro
