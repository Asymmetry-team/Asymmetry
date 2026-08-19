import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <section className='featured background' id='home-services'>
        <div className='container'>
          <Link to='/services' className='home-section-link'>
            <Heading title='სერვისები' subtitle='' accent />
          </Link>

          <button
            className={`services-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
          >
            <span>სრული სერვისები</span>
            <Icon icon='mdi:chevron-down' className='services-toggle-chevron' />
          </button>

          <div className={`services-collapse ${open ? "open" : ""}`}>
            <div className="services-frame">
              <FeaturedCard />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Featured
