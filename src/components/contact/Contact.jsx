import React from "react"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import { footer } from "../data/Data"
import "./contact.css"

const iconMap = {
  Facebook: "mdi:facebook",
  Instagram: "mdi:instagram",
  TikTok: "ic:baseline-tiktok",
  YouTube: "mdi:youtube",
  "connectasymmetry@gmail.com": "mdi:gmail",
  "571 14 14 69": "mdi:phone",
}

const Contact = () => {
  const contactItems = footer[0].text
  const hours = footer[1].text

  return (
    <>
      <Seo
        title="კონტაქტი — დაგვიკავშირდით | Asymmetry"
        description="დაუკავშირდით Asymmetry არქიტექტურულ სტუდიას: connectasymmetry@gmail.com, Facebook, Instagram, TikTok, YouTube. სამუშაო საათები: ორშაბათი–შაბათი 10:00–20:00."
        path="/contact"
      />
      <section className="contact mb">
        <Back name="" title="დაგვიკავშირდით" cover={img} />
        <div className="container">
          <div className="contact-wrap">
            <div className="contact-cards">
              <div className="contact-card">
                <h2 className="contact-title">საკონტაქტო ინფორმაცია</h2>
                <ul className="contact-list">
                  {contactItems.map((item, i) => (
                    <li key={i} className="contact-item">
                      <span className="contact-item-icon">
                        <Icon icon={iconMap[item.list] || "mdi:link-variant"} />
                      </span>
                      {item.href ? (
                        <a
                          className="contact-text"
                          href={item.href}
                          {...(item.href.startsWith("http")
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}
                        >
                          {item.list}
                        </a>
                      ) : (
                        <span className="contact-text">{item.list}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-card">
                <h2 className="contact-title">სამუშაო საათები</h2>
                <ul className="hours-list">
                  {hours.map((h, i) => (
                    <li key={i} className="hours-row">
                      <span>{h.day}</span>
                      <span>{h.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="contact-card note-card">
              <p className="contact-note">ხარისხი ყველაზე მნიშვნელოვანია</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
