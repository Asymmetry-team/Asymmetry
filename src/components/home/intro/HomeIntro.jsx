import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useLang } from "../../../i18n"
import "./homeIntro.css"

// Keyword-rich intro block right under the hero. The paragraph is collapsed by
// default (clean UI) behind a "ვრცლად" toggle, but it stays in the HTML
// (prerendered), so Google indexes it at full weight — an expandable section,
// not hidden/cloaked text. The keyword-rich H2 stays visible.
const HomeIntro = () => {
  const { tr } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <section className="home-intro" aria-label="არქიტექტურული მომსახურება">
      <div className="container">
        <h2 className="hi-title">
          {tr("არქიტექტურული პროექტირება")}
          <span className="hi-title-sub">
            {tr("არქიტექტურული პროექტი და მშენებლობის ნებართვა")}
          </span>
        </h2>
        <span className="hi-rule" />

        <div className={`hi-more ${open ? "open" : ""}`}>
          <div className="hi-grid">
            {/* left: the descriptive copy */}
            <div className="hi-col hi-col--text">
              <p className="hi-lead">
                <b>ASYMMETRY</b> — ასიმეტრია არის არქიტექტურული კომპანია
                თბილისში, რომელიც 2019 წლიდან ქმნის ინდივიდუალურ, ფუნქციურ,
                ესთეტიკურ და ენერგოეფექტურ პროექტებს.
              </p>
              <p className="hi-lead">
                ჩვენ გვჯერა, რომ მაღალი ხარისხის არქიტექტურა ფინანსურად
                ხელმისაწვდომიც უნდა იყოს. ამიტომ გთავაზობთ პრემიუმ დიზაინსა და
                სანდო საინჟინრო პროექტებს გამჭვირვალე და კონკურენტულ ფასად —
                ხარისხისა და ღირებულების ოპტიმალური თანაფარდობით.
              </p>
              <p className="hi-note">
                ჩვენი ოფისი მდებარეობს თბილისში, წერეთლის გამზირი N116-ში —
                „დიდუბე პლაზა, რადიუსი“. თანამშრომლობა ფორმდება ხელშეკრულებით,
                სრული უფლებებისა და პირობების დაცვით.
              </p>
            </div>

            {/* right: the process steps + service chips */}
            <div className="hi-col hi-col--lists">
              <p className="hi-sub-label">{tr("მომსახურების ეტაპები")}</p>
              <ol className="hi-steps" aria-label="მომსახურების ეტაპები">
                {[
                  "არქიტექტორის კონსულტაცია",
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
                {[
                  "60 კვადრატამდე შენობა",
                  "კერძო სახლის პროექტირება",
                  "კორპუსის პროექტირება",
                  "გეოლოგიური პროექტი",
                  "კონსტრუქციული პროექტი",
                  "გეოდეზიური სამუშაოები",
                ].map((c, i) => (
                  <span className="hi-chip" key={i}>
                    {tr(c)}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          className="hi-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
        >
          {open ? tr("დამალვა") : tr("ვრცლად")}
          <Icon icon="mdi:chevron-down" className="hi-toggle-ico" />
        </button>
      </div>
    </section>
  )
}

export default HomeIntro
