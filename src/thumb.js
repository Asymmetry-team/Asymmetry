// Card-sized version of a project photo: the local renders have a 720px "-sm"
// copy next to the full file (public/images/houses/h-N/N-sm.jpg, ~55 KB instead
// of 200–450 KB), Sanity images are resized by its CDN. Anything else is
// returned unchanged.
export const thumb = (src = "") => {
  if (/^\/images\/houses\/h-\d+\/\d+\.jpg$/.test(src)) return src.replace(/\.jpg$/, "-sm.jpg")
  if (src.startsWith("https://cdn.sanity.io/") && !src.includes("?")) return `${src}?w=720&auto=format`
  return src
}
