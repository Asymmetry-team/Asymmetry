import React, { useState } from "react"

// Hero-slot video: does NOT autoplay. Until the viewer presses play it is a
// plain <img> of the poster (+ a play button) — the page's LCP element, so it
// paints as early as any image (a <video poster> paints late on mobile Chrome
// and held LCP back). The video itself, with native controls and sound, is
// only created (and its file fetched) on that press.
// Shared by the architecture service page and the consultation page so both
// behave identically.
// Newer codecs give a sharper picture at the same size. Each is used only where
// the device can decode it smoothly; everything else gets the plain H.264 src.
const CODECS = [
  ["-av1.mp4", "av01.0.08M.08"],
  ["-hevc.mp4", "hvc1.1.6.L120.90"],
]
const canPlaySmoothly = async (codec) => {
  const contentType = `video/mp4; codecs="${codec}"`
  if (!document.createElement("video").canPlayType(contentType)) return false
  if (!navigator.mediaCapabilities) return true
  const info = await navigator.mediaCapabilities.decodingInfo({
    type: "file",
    video: { contentType, width: 1920, height: 1080, bitrate: 2000000, framerate: 30 },
  })
  return info.supported && info.smooth
}
const bestSource = async (src) => {
  try {
    for (const [suffix, codec] of CODECS) {
      if (await canPlaySmoothly(codec)) return src.replace(/\.mp4$/, suffix)
    }
  } catch (e) {
    // fall through to the H.264 file
  }
  return src
}

const HeroVideo = ({ src, poster, label = "ვიდეოს ჩართვა" }) => {
  // null until pressed, then the file this device plays best
  const [playing, setPlaying] = useState(null)
  const play = async () => setPlaying(await bestSource(src))

  if (playing)
    return (
      <video
        className="aq-hero-poster"
        src={playing}
        poster={poster}
        playsInline
        controls
        autoPlay
      />
    )

  return (
    <button
      type="button"
      className="aq-hero-play"
      onClick={play}
      aria-label={label}
    >
      <img
        className="aq-hero-poster"
        src={poster}
        alt=""
        width="960"
        height="540"
        fetchpriority="high"
      />
      <span className="aq-hero-play-btn" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="30" height="30">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </span>
    </button>
  )
}

export default HeroVideo
