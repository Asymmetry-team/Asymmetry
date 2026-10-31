// Shared by every "price calculation" form (service pages, consultation page,
// blog posts, floating PriceBubble): both the cadastral code and the floor
// area are required.

export const priceReadyOf = (cad, sqm) => cad.trim() !== "" && sqm.trim() !== ""


const priceText = (lang, cad, sqm) =>
  lang === "en"
    ? `Hello! I'd like a price estimate for a project.\n` +
      `Cadastral code of the plot: ${cad.trim()}\n` +
      `Average building area: ${sqm.trim()} m²`
    : `გამარჯობა! მინდა პროექტის ფასის გამოთვლა.\n` +
      `მიწის საკადასტრო კოდი: ${cad.trim()}\n` +
      `შენობის საშუალო კვადრატულობა: ${sqm.trim()} მ²`

// opens the global ContactChooser with the details pre-filled; a call can't carry
// this text, so only WhatsApp and Messenger are offered
export const sendPriceRequest = (lang, cad, sqm) =>
  window.dispatchEvent(
    new CustomEvent("asymmetry:contact", {
      detail: { text: priceText(lang, cad, sqm), form: "price_form" },
    })
  )

// scrolls to the page's big calculator and pulses it once it has arrived;
// false when the page has none
let flashCleanup = null
export const goToPriceBox = () => {
  const box = document.querySelector(".aq-price")
  if (!box || !box.offsetParent) return false
  // a repeat click cancels the running pulse so the two never overlap
  if (flashCleanup) flashCleanup()
  const phone = window.matchMedia("(max-width: 900px)").matches
  // + the pinned English-page bar, when it is showing
  const langBar = document.querySelector(".lang-banner")
  const header = (phone ? 84 : 160) + (langBar ? langBar.offsetHeight : 0)
  const top = box.getBoundingClientRect().top + window.scrollY - header

  let waitTimer = 0
  let endTimer = 0
  const start = () => {
    window.removeEventListener("scrollend", start)
    clearTimeout(waitTimer)
    // phones: no focus, it would pop the keyboard open over the form
    const input = box.querySelector("input")
    if (input && !phone) input.focus({ preventScroll: true })
    box.classList.add("aq-price--flash")
    endTimer = setTimeout(() => box.classList.remove("aq-price--flash"), 1500)
  }
  flashCleanup = () => {
    window.removeEventListener("scrollend", start)
    clearTimeout(waitTimer)
    clearTimeout(endTimer)
    box.classList.remove("aq-price--flash")
    void box.offsetWidth
  }
  if (Math.abs(top - window.scrollY) < 2) {
    start()
  } else {
    window.addEventListener("scrollend", start)
    waitTimer = setTimeout(start, 1600)
    window.scrollTo({ top, behavior: "smooth" })
  }
  return true
}
