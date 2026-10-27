// Shared by every "price calculation" form (service pages, consultation page,
// blog posts, floating PriceBubble): both the cadastral code and the floor
// area are required.

export const priceReadyOf = (cad, sqm) => cad.trim() !== "" && sqm.trim() !== ""

// blog posts that rank for price searches ("სახლის პროექტის ფასი") open with
// the price calculator as their first block — no side-panel or floating
// PriceBubble copy there
export const PRICE_TOP_POSTS = ["kerdzo-sakhlis-proektireba-pasi-vadebi-da-shetankhmeba"]

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
