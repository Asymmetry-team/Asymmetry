import React, { useEffect } from "react"
import Seo from "../common/Seo"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import HomeIntro from "./intro/HomeIntro"
import ProjectsBlog from "./projects/ProjectsBlog"
import Highlights from "./highlights/Highlights"
import BlogCarousel from "./blog/BlogCarousel"

const Home = () => {
  // ProfessionalService (LocalBusiness) structured data → helps Google
  // understand the studio (name, location, phone, socials) and supports local
  // "არქიტექტურული სტუდია" search. Injected + cleaned up like the FAQ LD.
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: "Asymmetry — არქიტექტურული სტუდია",
      alternateName: "ასიმეტრია",
      url: "https://asymmetry.ge",
      logo: "https://asymmetry.ge/images/logo.png",
      image: "https://asymmetry.ge/images/banner.jpg",
      description:
        "არქიტექტურული სტუდია საქართველოში — არქიტექტურული პროექტი, კერძო სახლის და კორპუსის პროექტირება, პროექტის შეთანხმება და მშენებლობის ნებართვის აღება.",
      telephone: "+995571141469",
      email: "connectasymmetry@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "წერეთლის გამზირი 116",
        addressLocality: "თბილისი",
        addressCountry: "GE",
      },
      areaServed: { "@type": "Country", name: "Georgia" },
      priceRange: "₾₾",
      sameAs: [
        "https://www.facebook.com/profile.php?id=100092504264433",
        "https://www.instagram.com/studio.asymmetry/",
        "https://www.tiktok.com/@studio_asymmetry",
        "https://www.youtube.com/@connect.asymmetry",
      ],
    }
    const el = document.createElement("script")
    el.type = "application/ld+json"
    el.setAttribute("data-org-ld", "1")
    el.textContent = JSON.stringify(ld)
    document.head.appendChild(el)
    return () => el.remove()
  }, [])

  return (
    <>
      <Seo
        title="არქიტექტურული სტუდია Asymmetry — არქიტექტურული პროექტი და მშენებლობის ნებართვა"
        description="Asymmetry — არქიტექტურული სტუდია საქართველოში. სრული არქიტექტურული მომსახურება: არქიტექტურული პროექტი, პროექტირება, კონსტრუქცია, ინტერიერის დიზაინი და მშენებლობის ნებართვის აღება."
        path="/"
      />
      <Hero />
      <HomeIntro />
      <Featured />
      <ProjectsBlog />
      <BlogCarousel />
      <Highlights />
    </>
  )
}

export default Home
