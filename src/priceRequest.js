// Shared by every "price calculation" form (service pages, consultation page,
// blog posts, floating PriceBubble). Only one field is needed to send: many
// visitors don't have the cadastral code yet, and requiring both fields lost
// most of the leads that started the form.

export const priceReadyOf = (cad, sqm) => cad.trim() !== "" || sqm.trim() !== ""

const priceText = (lang, cad, sqm) => {
  const c = cad.trim()
  const s = sqm.trim()
  if (lang === "en")
    return (
      `Hello! I'd like a price estimate for a project.\n` +
      (c ? `Cadastral code of the plot: ${c}\n` : `I don't have the cadastral code yet.\n`) +
      (s ? `Average building area: ${s} m²` : "")
    ).trim()
  return (
    `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
    (c ? `მიწის საკადასტრო კოდი: ${c}\n` : `საკადასტრო კოდი ჯერ არ მაქვს.\n`) +
    (s ? `შენობის საშუალო კვადრატულობა: ${s} მ²` : "")
  ).trim()
}

// opens the global ContactChooser with the details pre-filled (+ a call option)
export const sendPriceRequest = (lang, cad, sqm) =>
  window.dispatchEvent(
    new CustomEvent("asymmetry:contact", {
      detail: { text: priceText(lang, cad, sqm), form: "price_form", call: true },
    })
  )
