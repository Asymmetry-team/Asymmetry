import React, { useState } from "react"

// Hero-slot video: does NOT autoplay. Until the viewer presses play it is a
// plain <img> of the poster (+ a play button) — the page's LCP element, so it
// paints as early as any image (a <video poster> paints late on mobile Chrome
// and held LCP back). The video itself, with native controls and sound, is
// only created (and its file fetched) on that press.
// Shared by the architecture service page and the consultation page so both
// behave identically.
const HeroVideo = ({ src, poster, label = "ვიდეოს ჩართვა" }) => {
  const [playing, setPlaying] = useState(false)

  if (playing)
    return (
      <video
        className="aq-hero-poster"
        src={src}
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
      onClick={() => setPlaying(true)}
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
