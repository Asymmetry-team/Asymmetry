import React, { useEffect } from "react"
import Seo from "../common/Seo"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import HomeIntro from "./intro/HomeIntro"
import ProjectsBlog from "./projects/ProjectsBlog"
import Highlights from "./highlights/Highlights"
import BlogCarousel from "./blog/BlogCarousel"
import Partners from "./partners/Partners"
import HomeProcess from "./featured/HomeProcess"

const Home = () => {
  // ProfessionalService (LocalBusiness) structured data → helps Google
  // understand the studio (name, location, phone, socials) and supports local
  // "არქიტექტურული სტუდია" search. Injected + cleaned up like the FAQ LD.
  useEffect(() => {
    const ld = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      // same @id as the site-wide LD in index.html → Google merges them into one entity
      "@id": "https://asymmetry.ge/#organization",
      name: "ასიმეტრია — არქიტექტურული კომპანია (Asymmetry)",
      alternateName: [
        "ასიმეტრია",
        "Asymmetry",
        "არქიტექტურული კომპანია ასიმეტრია",
        "არქიტექტურული სტუდია ასიმეტრია",
      ],
      url: "https://asymmetry.ge",
      logo: "https://asymmetry.ge/images/logo.png",
      image: "https://asymmetry.ge/images/banner.jpg",
      description:
        "ასიმეტრია (Asymmetry) — არქიტექტურული კომპანია და სტუდია თბილისში. 2019 წლიდან არქიტექტორთა გუნდი ქმნის ინდივიდუალურ, ფუნქციურ და ენერგოეფექტურ არქიტექტურას.",
      foundingDate: "2019",
      telephone: "+995571141469",
      email: "connectasymmetry@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "წერეთლის გამზირი 116",
        addressLocality: "თბილისი",
        postalCode: "0119",
        addressCountry: "GE",
      },
      areaServed: [
        { "@type": "Country", name: "Georgia" },
        { "@type": "City", name: "თბილისი" },
        { "@type": "City", name: "ბათუმი" },
        { "@type": "City", name: "ქუთაისი" },
        { "@type": "City", name: "რუსთავი" },
      ],
      knowsLanguage: ["ka", "en"],
      priceRange: "₾₾",
      sameAs: [
        "https://www.facebook.com/profile.php?id=100092504264433",
        "https://www.instagram.com/studio.asymmetry/",
        "https://www.tiktok.com/@studio_asymmetry",
        "https://www.youtube.com/@connect.asymmetry",
        "https://www.google.com/maps/place/?q=place_id:ChIJ_fVicwBzREARKWBmbZjnBd4",
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
        title="ასიმეტრია — არქიტექტურული კომპანია და სტუდია თბილისში | Asymmetry"
        description="ასიმეტრია — არქიტექტურული კომპანია და სტუდია თბილისში. 2019 წლიდან არქიტექტორთა გუნდი ქმნის ინდივიდუალურ, ფუნქციურ და ენერგოეფექტურ არქიტექტურას."
        path="/"
      />
      <Hero />
      <Featured />
      <ProjectsBlog />
      {/* mobile-only: "how we work" between projects and blog (on desktop it
          renders beside the services inside <Featured>) */}
      <section className="home-proc-mobile-wrap" aria-label="როგორ ვმუშაობთ">
        <div className="container">
          <HomeProcess className="home-proc-mobile" />
        </div>
      </section>
      <BlogCarousel />
      {/* tail sections — order differs by viewport (CSS `order` on .home-tail):
          desktop = intro ABOVE reviews/FAQ; mobile = reviews/FAQ, then intro,
          then partners at the very bottom */}
      <div className="home-tail">
        <Highlights />
        {/* partners repeat — mobile only (desktop copy lives in Featured) */}
        <section className="home-partners-mobile" aria-label="პარტნიორები">
          <div className="container">
            <Partners variant="standalone" reveal={false} />
          </div>
        </section>
        <HomeIntro />
      </div>
    </>
  )
}

export default Home
