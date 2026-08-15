import React from "react"
import Heading from "../../common/Heading"
import "./Featured.css"
import FeaturedCard from "./FeaturedCard"

const Featured = () => {
  return (
    <>
      <section className='featured background' id='home-services'>
        <div className='container'>
          <Heading title='ჩვენ გთავაზობთ' subtitle='' />
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Featured
