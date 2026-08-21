import React from "react"
import { Link } from "react-router-dom"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import Back from "../common/Back"
import "./blogSoon.css"

// Placeholder blog articles point here until real content is published.
const BlogSoon = () => {
  return (
    <>
      <Seo
        title="ბლოგი — მალე | Asymmetry"
        description="ეს სტატია დამუშავების პროცესშია და მალე გამოქვეყნდება."
        path="/blog-soon"
      />
      <section className="blog-soon mb">
        <Back name="" title="ბლოგი" cover="" />
        <div className="container blog-soon-inner">
          <span className="blog-soon-ico">
            <Icon icon="mdi:pencil-ruler" />
          </span>
          <h1>სტატია დამუშავების პროცესშია ✍️</h1>
          <p>
            ეს მასალა ჯერ მზადდება და მალე გამოქვეყნდება. მადლობა
            მოთმინებისთვის!
          </p>
          <Link to="/blog" className="blog-soon-btn">
            ბლოგზე დაბრუნება
          </Link>
        </div>
      </section>
    </>
  )
}

export default BlogSoon
