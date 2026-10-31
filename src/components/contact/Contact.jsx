import React from "react"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { footer } from "../data/Data"
import { useLang } from "../../i18n"
import ContactForm from "./ContactForm"
import "./contact.css"

const PHONE = "tel:+995571141469"
const WHATSAPP = "https://wa.me/995571141469"
const EMAIL = "connectasymmetry@gmail.com"
const MAP = "https://www.google.com/maps/place/?q=place_id:ChIJ_fVicwBzREARKWBmbZjnBd4"

const socialIcons = {
  Facebook: "mdi:facebook",
  Instagram: "mdi:instagram",
  TikTok: "ic:baseline-tiktok",
  YouTube: "mdi:youtube",
}

const Contact = () => {
  const { tr } = useLang()
  const socials = footer[0].text.filter((item) => socialIcons[item.list])
  const hours = footer[1].text
  const quick = [
    { href: PHONE, icon: "mdi:phone", label: tr("დაგვირეკეთ"), value: "571 14 14 69" },
    { href: WHATSAPP, icon: "mdi:whatsapp", label: "WhatsApp", value: tr("მოგვწერეთ"), external: true },
    { href: `mailto:${EMAIL}`, icon: "mdi:gmail", label: tr("ელფოსტა"), value: EMAIL },
  ]

  return (
    <>
      <Seo
        title={tr("კონტაქტი — დაგვიკავშირდით | Asymmetry")}
        description={tr("დაუკავშირდით Asymmetry არქიტექტურულ სტუდიას: +995 571 14 14 69, connectasymmetry@gmail.com, Facebook, Instagram. ორშაბათი–შაბათი 10:00–20:00.")}
        path="/contact"
      />
      <section className="cx">
        <div className="cx-hero">
          <div className="container">
            <h1 className="cx-title">{tr("დაგვიკავშირდით")}</h1>
            <p className="cx-lead">{tr("მოგვწერეთ ან დაგვირეკეთ — პირველი კონსულტაცია უფასოა.")}</p>
            <div className="cx-quick">
              {quick.map((q) => (
                <a
                  key={q.href}
                  className="cx-quick-card"
                  href={q.href}
                  {...(q.external ? { target: "_blank", rel: "noreferrer" } : {})}
                >
                  <span className="cx-ico">
                    <Icon icon={q.icon} />
                  </span>
                  <span className="cx-quick-text">
                    <span className="cx-quick-label">{q.label}</span>
                    <span className="cx-quick-value">{q.value}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="container cx-grid">
          <ContactForm />

          <aside className="cx-panel cx-side">
            <div>
              <h2 className="cx-h2">{tr("ოფისი")}</h2>
              <a className="cx-address" href={MAP} target="_blank" rel="noreferrer">
                <Icon icon="mdi:map-marker" />
                <span>{tr("წერეთლის 116, თბილისი")}</span>
                <Icon icon="mdi:arrow-right" className="cx-address-arrow" />
              </a>
            </div>

            <div>
              <h2 className="cx-h2">{tr("სამუშაო საათები")}</h2>
              <ul className="cx-hours">
                <li>
                  <span>{tr("ორშაბათი–შაბათი")}</span>
                  <b>{hours[0].time}</b>
                </li>
                <li>
                  <span>{tr(hours[6].day)}</span>
                  <b>{tr(hours[6].time)}</b>
                </li>
              </ul>
            </div>

            <div>
              <h2 className="cx-h2">{tr("სოციალური ქსელები")}</h2>
              <div className="cx-socials">
                {socials.map((s) => (
                  <a key={s.list} href={s.href} target="_blank" rel="noreferrer" aria-label={s.list}>
                    <Icon icon={socialIcons[s.list]} />
                  </a>
                ))}
                <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                  <Icon icon="mdi:whatsapp" />
                </a>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}

export default Contact
