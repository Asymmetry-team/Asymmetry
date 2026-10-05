// yet-another-react-lightbox's Zoom plugin only enables zooming when it knows an
// image's real pixel size. Its own onLoad detection didn't fire for our slides
// (zoom buttons stayed disabled, pinch did nothing), so we read the natural
// size ourselves and pass width/height with every slide.
const cache = new Map()

const measure = (src) =>
  cache.get(src) ||
  cache
    .set(
      src,
      new Promise((resolve) => {
        const img = new Image()
        img.onload = () => resolve({ src, width: img.naturalWidth, height: img.naturalHeight })
        img.onerror = () => resolve({ src })
        img.src = src
      })
    )
    .get(src)

// [src] → Promise<[{ src, width, height }]>
export const slidesWithSize = (srcs = []) => Promise.all(srcs.map(measure))
