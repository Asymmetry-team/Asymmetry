import React, { useState } from "react"
import { useLang } from "../../i18n"

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const ContactForm = () => {
  const { tr } = useLang()
  const [values, setValues] = useState({ name: "", email: "", phone: "", message: "" })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [sent, setSent] = useState(false)
  const [company, setCompany] = useState("") // honeypot — bots fill this, humans don't

  const validate = (v) => {
    const e = {}
    if (!v.name.trim()) e.name = "გთხოვთ, მიუთითოთ სახელი"
    if (!v.email.trim()) e.email = "გთხოვთ, მიუთითოთ ელ. ფოსტა"
    else if (!emailRe.test(v.email)) e.email = "ელ. ფოსტა არასწორია"
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

  const onSubmit = (e) => {
    e.preventDefault()
    if (company) return // honeypot tripped → silently drop
    const eMap = validate(values)
    setErrors(eMap)
    setTouched({ name: true, email: true, phone: true, message: true })
    if (Object.keys(eMap).length) return

    // No backend yet → open the user's mail client pre-filled.
    const body = `სახელი: ${values.name}%0Aტელეფონი: ${values.phone}%0A%0A${values.message}`
    window.location.href = `mailto:connectasymmetry@gmail.com?subject=ვებ-გვერდიდან: ${encodeURIComponent(
      values.name
    )}&body=${body}`
    setSent(true)
  }

  const fieldClass = (n) =>
    `cf-field${errors[n] && touched[n] ? " err" : ""}${
      touched[n] && !errors[n] && values[n] ? " ok" : ""
    }`

  if (sent) {
    return (
      <div className="cf-success">
        <h3>{tr("მადლობა! 🙌")}</h3>
        <p>{tr("თქვენი შეტყობინება მოემზადა — გამოგზავნეთ და მალე გიპასუხებთ.")}</p>
      </div>
    )
  }

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
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

        <div className={fieldClass("email")}>
          <label>{tr("ელ. ფოსტა")} *</label>
          <input
            name="email"
            value={values.email}
            onChange={onChange}
            onBlur={onBlur}
            placeholder="you@example.com"
          />
          {errors.email && touched.email && <span className="cf-msg">{tr(errors.email)}</span>}
        </div>
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

      <button type="submit" className="cf-submit">
        {tr("გაგზავნა →")}
      </button>
    </form>
  )
}

export default ContactForm
