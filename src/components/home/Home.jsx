import React from "react"
import Seo from "../common/Seo"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import ProjectsBlog from "./projects/ProjectsBlog"
import Highlights from "./highlights/Highlights"
import BlogCarousel from "./blog/BlogCarousel"

const Home = () => {
  return (
    <>
      <Seo
        title="არქიტექტურული სტუდია Asymmetry — არქიტექტურული პროექტი და მშენებლობის ნებართვა"
        description="Asymmetry — არქიტექტურული სტუდია საქართველოში. სრული არქიტექტურული მომსახურება: არქიტექტურული პროექტი, პროექტირება, კონსტრუქცია, ინტერიერის დიზაინი და მშენებლობის ნებართვის აღება."
        path="/"
      />
      <Hero />
      <Featured />
      <ProjectsBlog />
      <BlogCarousel />
      <Highlights />
    </>
  )
}

export default Home
