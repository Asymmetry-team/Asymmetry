// Merge an English content tree over its Georgian original (same shape).
// Strings are replaced where the EN tree has one; arrays are merged by index;
// anything the EN tree lacks falls back to Georgian — and scripts/i18n-audit.mjs
// then reports that leftover Georgian, so nothing slips through silently.
export const localize = (ka, en) => {
  if (en === undefined || en === null) return ka
  if (typeof ka === "string") return typeof en === "string" ? en : ka
  if (Array.isArray(ka)) return ka.map((x, i) => localize(x, Array.isArray(en) ? en[i] : undefined))
  if (ka && typeof ka === "object") {
    const out = { ...ka }
    for (const k of Object.keys(ka)) out[k] = localize(ka[k], en[k])
    return out
  }
  return ka
}
