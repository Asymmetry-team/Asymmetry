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
          {tr("არქიტექტურული პროექტირება - არქიტექტურული პროექტი და მშენებლობის ნებართვა")}
        </h2>
        <span className="hi-rule" />

        <div className={`hi-more ${open ? "open" : ""}`}>
          <p className="hi-text">
            <b>Asymmetry</b>{" "}
            {tr(
              "— არქიტექტურული სტუდია, რომელიც გთავაზობთ სრულ არქიტექტურულ მომსახურებას: იდეის კონცეფციიდან არქიტექტურულ პროექტამდე, პროექტის შეთანხმებამდე და მშენებლობის ნებართვამდე. ვასრულებთ კერძო სახლის, კორპუსის და 1 კლასის შენობის პროექტირებას, კონსტრუქციულ, გეოლოგიურ და გეოდეზიურ პროექტებს."
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
