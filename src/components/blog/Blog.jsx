import React from "react"
import Seo from "../common/Seo"
import Back from "../common/Back"
import RecentCard from "../home/recent/RecentCard"
import { useLang } from "../../i18n"
import "../home/recent/recent.css"
import img from "../images/about.jpg"

const Blog = () => {
  const { tr } = useLang()
  return (
    <>
      <Seo
        title="პროექტები — არქიტექტურული პროექტები | Asymmetry"
        description="Asymmetry-ს განხორციელებული არქიტექტურული პროექტები საქართველოში: საცხოვრებელი სახლები, სასტუმროები, ინტერიერის დიზაინი — თბილისი, მცხეთა, ბორჯომი და სხვა."
        path="/projects"
      />
      <section className='blog-out mb'>
        <Back name='' title={tr('პროექტები')} cover={img} />
        <div className='container recent'>
          <RecentCard />
        </div>
      </section>
    </>
  )
}

export default Blog
