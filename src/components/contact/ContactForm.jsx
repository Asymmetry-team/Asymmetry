import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { useLang } from "../../i18n"
import { track } from "../../analytics"

// send the filled-in form straight to WhatsApp / Messenger (no email, no backend)
const WHATSAPP = "995571141469"
const MESSENGER = "100092504264433"

const ContactForm = () => {
  const { tr } = useLang()
  const [values, setValues] = useState({ name: "", phone: "", message: "" })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [company, setCompany] = useState("") // honeypot — bots fill this, humans don't

  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = "გთხოვთ, მიუთითოთ სახელი"
    if (!v.message.trim()) e.message = "მოკლედ აღწერეთ თქვენი პროექტი"
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
    `გამარჯობა! მინდა კონსულტაცია პროექტზე.\n` +
    `სახელი: ${values.name.trim()}\n` +
    (values.phone.trim() ? `ტელეფონი: ${values.phone.trim()}\n` : "") +
    `\n${values.message.trim()}`

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

  const fieldClass = (n) =>
    `cf-field${errors[n] && touched[n] ? " err" : ""}${
      touched[n] && !errors[n] && values[n] ? " ok" : ""
    }`

  return (
    <form className="contact-form" onSubmit={(e) => e.preventDefault()} noValidate>
      <h2 className="contact-title">{tr("მოგვწერეთ")}</h2>

      <div className="cf-row">
        <div className={fieldClass("name")}>
          <label>{tr("სახელი")} *</label>
          <input
            name="name"
            value={values.name}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={tr("თქვენი სახელი")}
          />
          {errors.name && touched.name && <span className="cf-msg">{tr(errors.name)}</span>}
        </div>

        <div className={fieldClass("phone")}>
          <label>{tr("ტელეფონი")}</label>
          <input
            name="phone"
            value={values.phone}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="+995 5__ __ __ __"
          />
        </div>
      </div>

      <div className={fieldClass("message")}>
        <label>{tr("თქვენი პროექტის შესახებ")} *</label>
        <textarea
          name="message"
          rows="4"
          value={values.message}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={tr("მოკლედ აღწერეთ, რას გეგმავთ...")}
        />
        {errors.message && touched.message && <span className="cf-msg">{tr(errors.message)}</span>}
      </div>

      {/* honeypot — hidden from humans, catches bots */}
      <input
        className="cf-hp"
        tabIndex="-1"
        autoComplete="off"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />

      <div className="cf-send-row">
        <button
          type="button"
          className="cf-submit cf-send cf-send--wa"
          onClick={() => send("whatsapp")}
        >
          <Icon icon="mdi:whatsapp" />
          WhatsApp
        </button>
        <button
          type="button"
          className="cf-submit cf-send cf-send--ms"
          onClick={() => send("messenger")}
        >
          <Icon icon="mdi:facebook-messenger" />
          Messenger
        </button>
      </div>
    </form>
  )
}

export default ContactForm
