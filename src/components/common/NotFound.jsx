import React from "react"
import { Link } from "react-router-dom"
import Seo from "./Seo"
import { useLang } from "../../i18n"
import "./notFound.css"

const NotFound = () => {
  const { tr } = useLang()
  return (
    <>
      <Seo
        title={tr("გვერდი ვერ მოიძებნა — 404 | Asymmetry")}
        description={tr("მოთხოვნილი გვერდი ვერ მოიძებნა.")}
        path="/404"
        noindex
      />
      <section className="notfound">
        <div className="container notfound-inner">
          <div className="notfound-code">404</div>
          <h1 className="notfound-title">{tr("გვერდი ვერ მოიძებნა")}</h1>
          <p className="notfound-text">
            {tr("როგორც ჩანს, ეს კუთხე ჯერ არ დაგვისრულებია.")}
          </p>
          <Link to="/" className="notfound-btn">
            {tr("მთავარ გვერდზე დაბრუნება")}
          </Link>
        </div>
      </section>
    </>
  )
}

export default NotFound
