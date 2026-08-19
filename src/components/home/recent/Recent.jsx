import React from "react"
import { Link } from "react-router-dom"
import Heading from "../../common/Heading"
import "./recent.css"
import RecentCard from "./RecentCard"

const Recent = () => {
  return (
    <>
      <section className='recent padding' id='home-projects'>
        <div className='container'>
          <Link to='/projects' className='home-section-link'>
            <Heading title='დასრულებული პროექტები' subtitle='' accent />
          </Link>
          <RecentCard preview />
        </div>
      </section>
    </>
  )
}

export default Recent
