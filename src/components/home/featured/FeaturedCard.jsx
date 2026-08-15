import React, { useState } from "react"
import { Icon } from "@iconify/react"
import { featured } from "../../data/Data"

const FeaturedCard = () => {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <>
      <div className='content grid4 mtop'>
        {featured.map((items, index) => (
          <div
            className={`box ${openIdx === index ? "open" : ""} ${
              items.details ? "has-details" : ""
            }`}
            key={index}
            onClick={() =>
              items.details && setOpenIdx(openIdx === index ? null : index)
            }
          >
            {items.iconify ? (
              <Icon icon={items.iconify} className='featured-iconify' />
            ) : (
              <img src={items.cover} alt={`Asymmetry — ${items.name}`} />
            )}
            <h4>{items.name}</h4>
            <label>{items.total}</label>

            {items.details && (
              <div className='service-popup'>
                <ul>
                  {items.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </>
  )
}

export default FeaturedCard
