import React from "react"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding' id='home-projects'>
        <div className='container'>
          <Heading title='დასრულებული პროექტები' subtitle='' accent />
          <RecentCard preview />
        </div>
      </section>
    </>
  )
}

export default Recent
