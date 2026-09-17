import React from "react"

// Hero-slot video: does NOT autoplay — it shows the first frame with the
// native controls, and plays (with sound) only when the viewer presses play.
// Shared by the architecture service page and the consultation page so both
// behave identically.
const HeroVideo = ({ src, poster }) => (
  <video
    className="aq-hero-poster"
    src={src}
    poster={poster}
    playsInline
    controls
    preload="metadata"
  />
)

export default HeroVideo
