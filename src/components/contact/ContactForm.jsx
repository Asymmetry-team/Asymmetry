import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useLang } from "../../i18n"
import { track } from "../../analytics"

// send the filled-in form straight to WhatsApp / Messenger (no email, no backend)
const WHATSAPP = "995571141469"
const MESSENGER = "100092504264433"
const TOPICS = ["სახლის პროექტი", "კორპუსის პროექტი", "კონსულტაცია", "სხვა"]

const ContactForm = () => {
  const { tr, lang } = useLang()
  const [values, setValues] = useState({ name: "", phone: "", message: "" })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [topic, setTopic] = useState("")
  const [company, setCompany] = useState("") // honeypot — bots fill this, humans don't

  const validate = (v, t = topic) => {
    const e = {}
    if (!v.name.trim()) e.name = tr("გთხოვთ, მიუთითოთ სახელი")
    // a chosen topic is enough to start the conversation
    if (!v.message.trim() && !t) e.message = tr("მოკლედ აღწერეთ თქვენი პროექტი")
    return e
  }

  const onChange = (e) => {
    const next = { ...values, [e.target.name]: e.target.value }
    setValues(next)
    if (touched[e.target.name]) setErrors(validate(next))
  }
  const onBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true })
    setErrors(validate(values))
  }

  const buildText = () =>
    (lang === "en"
      ? `Hello! I'd like a consultation about a project.\n` +
        `Name: ${values.name.trim()}\n` +
        (values.phone.trim() ? `Phone: ${values.phone.trim()}\n` : "") +
        (topic ? `Topic: ${tr(topic)}\n` : "")
      : `გამარჯობა! მინდა კონსულტაცია პროექტზე.\n` +
        `სახელი: ${values.name.trim()}\n` +
        (values.phone.trim() ? `ტელეფონი: ${values.phone.trim()}\n` : "") +
        (topic ? `თემა: ${topic}\n` : "")) +
    (values.message.trim() ? `\n${values.message.trim()}` : "")

  // validate, then open the chosen channel with the details pre-filled
  const send = (channel) => {
    if (company) return // honeypot tripped → silently drop
    const eMap = validate(values)
    setErrors(eMap)
    setTouched({ name: true, phone: true, message: true })
    if (Object.keys(eMap).length) return

    const text = buildText()
    track("generate_lead", { form: "contact_form", channel })
    track(`${channel}_click`, { source: "contact_form" })
    if (channel === "whatsapp") {
      window.open(
        `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`,
        "_blank",
        "noreferrer noopener"
      )
    } else {
      // m.me can't carry text — copy it so the sender can paste the details
      if (navigator.clipboard) navigator.clipboard.writeText(text).catch(() => {})
      window.open(`https://m.me/${MESSENGER}`, "_blank", "noreferrer noopener")
    }
  }

  const fieldClass = (n) => `cx-field${errors[n] && touched[n] ? " err" : ""}`

  const pickTopic = (t) => {
    const next = topic === t ? "" : t
    setTopic(next)
    if (touched.message) setErrors(validate(values, next))
  }

  return (
    <form className="cx-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <h2 className="cx-h2 cx-h2--main">{tr("მოგვწერეთ")}</h2>

      <div className="cx-topics" role="group" aria-label={tr("რა გაინტერესებთ?")}>
        {TOPICS.map((t) => (
          <button
            key={t}
            type="button"
            className={`cx-topic${topic === t ? " on" : ""}`}
            aria-pressed={topic === t}
            onClick={() => pickTopic(t)}
          >
            {tr(t)}
          </button>
        ))}
      </div>

      <div className="cx-row">
        <div className={fieldClass("name")}>
          <label htmlFor="cx-name">{tr("სახელი")} *</label>
          <input
            id="cx-name"
            name="name"
            autoComplete="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={tr("თქვენი სახელი")}
          />
          {errors.name && touched.name && <span className="cx-msg">{errors.name}</span>}
        </div>

        <div className={fieldClass("phone")}>
          <label htmlFor="cx-phone">{tr("ტელეფონი")}</label>
          <input
            id="cx-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="+995 5__ __ __ __"
          />
        </div>
      </div>

      <div className={fieldClass("message")}>
        <label htmlFor="cx-message">{tr("თქვენი პროექტის შესახებ")}</label>
        <textarea
          id="cx-message"
          name="message"
          rows="5"
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={tr("მოკლედ აღწერეთ, რას გეგმავთ...")}
        />
        {errors.message && touched.message && <span className="cx-msg">{errors.message}</span>}
      </div>

      {/* honeypot — hidden from humans, catches bots */}
      <input
        className="cx-hp"
        tabIndex="-1"
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <div className="cx-send-row">
        <button type="button" className="cx-send" onClick={() => send("whatsapp")}>
          <Icon icon="mdi:whatsapp" />
          WhatsApp
        </button>
        <button type="button" className="cx-send" onClick={() => send("messenger")}>
          <Icon icon="mdi:facebook-messenger" />
          Messenger
        </button>
      </div>
    </form>
  )
}

export default ContactForm
