import React from "react"
import Seo from "../common/Seo"
import img from "../images/services.jpg"
import Back from "../common/Back"
import "../home/featured/Featured.css"
import FeaturedCard from "../home/featured/FeaturedCard"

const Services = () => {
  return (
    <>
      <Seo
        title="სერვისები — არქიტექტურული მომსახურება | Asymmetry"
        description="Asymmetry-ს არქიტექტურული მომსახურება: არქიტექტურა, კონსტრუქცია, გეოლოგია, ენერგოეფექტურობა, ინტერიერის დიზაინი, დენდროლოგია, გეოდეზია და მშენებლობის ნებართვის აღება."
        path="/services"
      />
      <section className='services mb'>
        <Back name='' title='სერვისები' cover={img} />
        <div className='featured container'>
          <FeaturedCard />
        </div>
      </section>
    </>
  )
}

export default Services
