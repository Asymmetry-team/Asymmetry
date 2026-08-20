import React from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import "./notFound.css"

const NotFound = () => {
  return (
    <>
      <Seo
        title="გვერდი ვერ მოიძებნა — 404 | Asymmetry"
        description="მოთხოვნილი გვერდი ვერ მოიძებნა."
        path="/404"
      />
      <section className="notfound">
        <div className="container notfound-inner">
          <div className="notfound-code">404</div>
          <h1 className="notfound-title">გვერდი ვერ მოიძებნა</h1>
          <p className="notfound-text">
            როგორც ჩანს, ეს კუთხე ჯერ არ დაგვისრულებია.
          </p>
          <Link to="/" className="notfound-btn">
            მთავარ გვერდზე დაბრუნება
          </Link>
        </div>
      </section>
    </>
  )
}

export default NotFound
