import React from "react"
import { useLang } from "../../../i18n"
import "./homeIntro.css"

// Keyword-rich intro block right under the hero. Gives the home page real
// on-page text so the target phrases (არქიტექტურული პროექტი / პროექტირება /
// მშენებლობის ნებართვა …) are reinforced on the site's strongest page.
const HomeIntro = () => {
  const { tr } = useLang()
  return (
    <section className="home-intro" aria-label="არქიტექტურული მომსახურება">
      <div className="container">
        <h2 className="hi-title">
          {tr("არქიტექტურული სტუდია — არქიტექტურული პროექტი და მშენებლობის ნებართვა საქართველოში")}
        </h2>
        <span className="hi-rule" />
        <p className="hi-text">
          <b>Asymmetry</b>{" "}
          {tr(
            "— არქიტექტურული სტუდია, რომელიც გთავაზობთ სრულ არქიტექტურულ მომსახურებას: იდეის კონცეფციიდან არქიტექტურულ პროექტამდე, პროექტის შეთანხმებამდე და მშენებლობის ნებართვამდე. ვასრულებთ კერძო სახლის, კორპუსის და 1 კლასის შენობის პროექტირებას, კონსტრუქციულ, გეოლოგიურ და გეოდეზიურ პროექტებს."
          )}
        </p>
      </div>
    </section>
  )
}

export default HomeIntro
