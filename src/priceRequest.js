// Shared by every "price calculation" form (service pages, consultation page,
// blog posts, floating PriceBubble): both the cadastral code and the floor
// area are required.

export const priceReadyOf = (cad, sqm) => cad.trim() !== "" && sqm.trim() !== ""

// every blog post opens with the price calculator; posts about the
// architectural project in general (not a house) get an "architectural
// project" title on it instead of "house design"
export const PRICE_TOP_ARCH = ["arqiteqturuli-proeqtis-fasi"]

const priceText = (lang, cad, sqm) =>
  lang === "en"
    ? `Hello! I'd like a price estimate for a project.\n` +
      `Cadastral code of the plot: ${cad.trim()}\n` +
      `Average building area: ${sqm.trim()} m²`
    : `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
      `მიწის საკადასტრო კოდი: ${cad.trim()}\n` +
      `შენობის საშუალო კვადრატულობა: ${sqm.trim()} მ²`

// opens the global ContactChooser with the details pre-filled (+ a call option)
export const sendPriceRequest = (lang, cad, sqm) =>
  window.dispatchEvent(
    new CustomEvent("asymmetry:contact", {
      detail: { text: priceText(lang, cad, sqm), form: "price_form", call: true },
    })
  )
