import React from "react"
import Seo from "../common/Seo"
import img from "../images/pricing.jpg"
import Back from "../common/Back"
import { footer } from "../data/Data"
import "./contact.css"

const Contact = () => {
  // same 5 items as the footer contact panel (socials + email)
  const contactItems = footer[0].text

  return (
    <>
      <Seo
        title="კონტაქტი — დაგვიკავშირდით | Asymmetry"
        description="დაუკავშირდით Asymmetry არქიტექტურულ სტუდიას: connectasymmetry@gmail.com, Facebook, Instagram, TikTok, YouTube. მომსახურება ონლაინ ან არქიტექტორის ვიზიტით."
        path="/contact"
      />
      <section className="contact mb">
        <Back name="" title="დაგვიკავშირდით" cover={img} />
        <div className="container">
          <div className="contact-card">
            <h2>საკონტაქტო ინფორმაცია</h2>
            <ul className="contact-list">
              {contactItems.map((item, i) => (
                <li key={i}>
                  {item.href ? (
                    <a
                      href={item.href}
                      {...(item.href.startsWith("http")
                        ? { target: "_blank", rel: "noreferrer" }
                        : {})}
                    >
                      {item.list}
                    </a>
                  ) : (
                    item.list
                  )}
                </li>
              ))}
            </ul>
            <p className="contact-note">
              თქვენი დროის უკეთესი მენეჯმენტისა და კომფორტისთვის, ჩვენ გთავაზობთ
              მომსახურებას როგორც ონლაინ, ასევე არქიტექტორის ვიზიტით.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default Contact
