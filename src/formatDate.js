// Post dates. Georgian months are spelled out here because browsers without
// Georgian locale data fall back to English for "ka-GE".
const MONTHS_KA = [
  "იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი",
  "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი",
]

export const formatDate = (d, lang) => {
  if (!d) return ""
  const date = new Date(d)
  if (lang === "en")
    return date.toLocaleDateString("en-GB", { year: "numeric", month: "long", day: "numeric" })
  return `${date.getDate()} ${MONTHS_KA[date.getMonth()]}, ${date.getFullYear()}`
}
