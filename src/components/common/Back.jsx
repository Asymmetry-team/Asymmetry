import React from "react"

// Sub-page banner — the cover image already carries the ASYMMETRY branding,
// so no title overlay is drawn on top of it.
const Back = ({ title, cover }) => {
  return (
    <>
      <div className='back'>
        <img src={cover} alt={title} />
      </div>
    </>
  )
}

export default Back
