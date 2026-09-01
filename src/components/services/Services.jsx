import React from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import img from "../images/services.jpg"
import Back from "../common/Back"
import { featured } from "../data/Data"
import { useLang } from "../../i18n"
import "../home/featured/Featured.css"
import "./servicesPage.css"

// /services — two titled bubbles: architecture services (left) and the other
// services (right). Horizontal on desktop, stacked on mobile.
const Services = () => {
  const { tr } = useLang()
  const architecture = featured[0]
  const archPages = [architecture, ...(architecture.children || [])]
  const others = featured.slice(1)

  const card = (s) => (
    <Link key={s.slug} to={`/services/${s.slug}`} className="hs-card">
      <span className="hs-card-ico">
        <Icon icon={s.iconify || "mdi:office-building-outline"} />
      </span>
      <span className="hs-card-name">{tr(s.name)}</span>
      <Icon icon="mdi:arrow-right" className="hs-card-arrow" />
    </Link>
  )

  return (
    <>
      <Seo
        title="სერვისები — არქიტექტურული მომსახურება | Asymmetry"
        description="Asymmetry-ს სერვისები: არქიტექტურული მომსახურება, კერძო სახლის და კორპუსის პროექტირება, კონსტრუქციული და გეოლოგიური მომსახურება, საგზაო სქემები და გეოდეზიური სამუშაოები."
        path="/services"
      />
      <section className="services mb">
        <Back name="" title={tr("სერვისები")} cover={img} />
        <div className="container services-page">
          <div className="services-page-two">
            <div className="bubble">
              <div className="bubble-head">
                <span className="bubble-title grad-head grad-head-1">{tr("არქიტექტურული მომსახურებები")}</span>
              </div>
              <div className="hs-cards svc-sub-cards">{archPages.map(card)}</div>
            </div>

            <div className="bubble">
              <div className="bubble-head">
                <span className="bubble-title grad-head grad-head-2">{tr("სხვადასხვა მომსახურებები")}</span>
              </div>
              <div className="hs-cards svc-sub-cards">{others.map(card)}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Services
