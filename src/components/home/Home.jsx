import React from "react"
import Seo from "../common/Seo"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Recent from "./recent/Recent"
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
      <BlogCarousel />
      <Recent />
    </>
  )
}

export default Home
