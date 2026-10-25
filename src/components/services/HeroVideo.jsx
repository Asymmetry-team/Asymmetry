import React from "react"

// Hero-slot video: does NOT autoplay — it shows the poster photo with the
// native controls, and plays (with sound) only when the viewer presses play.
// preload="none": the (large) video file isn't fetched at all until then, so
// it no longer competes with the page's first paint on mobile.
// Shared by the architecture service page and the consultation page so both
// behave identically.
const HeroVideo = ({ src, poster }) => (
  <video
    className="aq-hero-poster"
    src={src}
    poster={poster}
    playsInline
    controls
    preload="none"
  />
)

export default HeroVideo
