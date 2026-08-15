import React from "react"

const Back = ({ name, title, cover }) => {
  return (
    <>
      <div className='back'>
        <img src={cover} alt={title} />
        <div className='container'>
          <div className='back-badge'>
            {name ? <span>{name}</span> : null}
            <h1>{title}</h1>
          </div>
        </div>
      </div>
    </>
  )
}

export default Back
