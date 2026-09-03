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
          <p className="hi-text">
            <b>Asymmetry</b>{" "}
            {tr(
              "— არქიტექტურული სტუდია თბილისში, რომელიც გთავაზობთ სრულ არქიტექტურულ მომსახურებას საქართველოს მასშტაბით: არქიტექტორის კონსულტაციიდან და ესკიზური კონცეფციიდან — 3D ვიზუალიზაციამდე, სამუშაო პროექტამდე, პროექტის შეთანხმებამდე და მშენებლობის ნებართვის აღებამდე. ვასრულებთ კერძო სახლის, მრავალბინიანი კორპუსისა და 1 კლასის შენობის პროექტირებას, ასევე კონსტრუქციულ, გეოლოგიურ და გეოდეზიურ პროექტებს — გეგმარებას, ფასადებს, ხარჯთაღრიცხვასა და ავტორის ზედამხედველობას. თითოეულ ობიექტს ინდივიდუალურად ვქმნით — ფუნქციური, ესთეტიკური და ენერგოეფექტური სივრცისთვის."
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
