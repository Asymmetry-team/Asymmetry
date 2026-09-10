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
          <p className="hi-lead">
            <b>Asymmetry</b>{" "}
            {tr(
              "— არქიტექტურული კომპანია თბილისში, რომელიც გთავაზობთ სრულ არქიტექტურულ მომსახურებას საქართველოს მასშტაბით. თითოეულ ობიექტს ინდივიდუალურად ვქმნით — ფუნქციური, ესთეტიკური და ენერგოეფექტური სივრცისთვის."
            )}
          </p>

          <ol className="hi-steps" aria-label="მომსახურების ეტაპები">
            {[
              "არქიტექტორის კონსულტაცია",
              "ესკიზური კონცეფცია",
              "3D ვიზუალიზაცია",
              "სამუშაო პროექტი",
              "პროექტის შეთანხმება",
              "მშენებლობის ნებართვა",
            ].map((s, i) => (
              <li className="hi-step" key={i}>
                <span className="hi-step-n">{i + 1}</span>
                <span>{tr(s)}</span>
              </li>
            ))}
          </ol>

          <p className="hi-sub-label">{tr("ვასრულებთ")}</p>
          <div className="hi-chips">
            {[
              "კერძო სახლის პროექტირება",
              "მრავალბინიანი კორპუსი",
              "1 კლასის შენობა",
              "კონსტრუქციული პროექტი",
              "გეოლოგიური კვლევა",
              "გეოდეზიური სამუშაოები",
              "გეგმარება და ფასადები",
              "ხარჯთაღრიცხვა",
              "ავტორის ზედამხედველობა",
            ].map((c, i) => (
              <span
                className={`hi-chip ${
                  c === "ხარჯთაღრიცხვა" ? "hi-chip--hide-mobile" : ""
                }`}
                key={i}
              >
                {tr(c)}
              </span>
            ))}
          </div>

          <p className="hi-note">
            {tr(
              "ასიმეტრია 2019 წლიდან ქმნის არქიტექტურულ პროექტებს და გვჯერა, რომ პრემიუმ, დახვეწილი და საუკეთესო ხარისხის არქიტექტურა ხელმისაწვდომი უნდა იყოს — ამიტომ მაღალი კლასის ინდივიდუალურ არქიტექტურულ პროექტს გთავაზობთ იაფ, ხელსაყრელ, გონივრულ და კონკურენტულ ფასად. ასიმეტრიაში იღებთ პრემიუმ ხარისხის დიზაინსა და სანდო საინჟინრო პროექტს ოპტიმალურ, გამჭვირვალე ღირებულებაში — ფასისა და ხარისხის საუკეთესო თანაფარდობით."
            )}
          </p>
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
