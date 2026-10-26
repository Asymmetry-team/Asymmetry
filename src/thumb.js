// Card-sized version of a photo. Local images have a smaller copy next to the
// full file: project renders a 720px "-sm" (public/images/houses/h-N/N-sm.jpg,
// ~55 KB instead of 200–450 KB), blog images a 720px "-sm", service heroes a
// "-960". Sanity and Unsplash images are resized by their CDN. Anything else is
// returned unchanged.
export const thumb = (src = "") => {
  if (/^\/images\/houses\/h-\d+\/\d+\.jpg$/.test(src)) return src.replace(/\.jpg$/, "-sm.jpg")
  if (/^\/images\/blog\/[\w-]+\.jpg$/.test(src) && !src.endsWith("-sm.jpg")) return src.replace(/\.jpg$/, "-sm.jpg")
  if (/^\/images\/services\/[\w-]+-hero\.jpg$/.test(src)) return src.replace(/\.jpg$/, "-960.jpg")
  if (src.startsWith("https://cdn.sanity.io/") && !src.includes("?")) return `${src}?w=720&auto=format`
  if (src.startsWith("https://images.unsplash.com/")) return src.replace(/([?&])w=\d+/, "$1w=720")
  return src
}
