import React, { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"
import Seo from "../common/Seo"
import { useLang } from "../../i18n"
import "./content.css"

// Asymmetry's social channels (same handles as the header / footer).
const platforms = [
  {
    key: "youtube",
    icon: "mdi:youtube",
    name: "YouTube",
    handle: "@connect.asymmetry",
    href: "https://www.youtube.com/@connect.asymmetry/featured",
    cta: "გამოიწერე",
  },
  {
    key: "instagram",
    icon: "mdi:instagram",
    name: "Instagram",
    handle: "@studio.asymmetry",
    href: "https://www.instagram.com/studio.asymmetry/",
    cta: "გამოგვყევი",
  },
  {
    key: "tiktok",
    icon: "ic:baseline-tiktok",
    name: "TikTok",
    handle: "@studio_asymmetry",
    href: "https://www.tiktok.com/@studio_asymmetry",
    cta: "გამოგვყევი",
  },
  {
    key: "facebook",
    icon: "mdi:facebook",
    name: "Facebook",
    handle: "Asymmetry",
    href: "https://www.facebook.com/profile.php?id=100092504264433",
    cta: "მოგვწონე",
  },
]

// Video showcase. Fill `thumb` with a YouTube thumbnail URL and `href` with the
// clip to wire a real video; without a thumb the card shows a branded tile.

// Latest Facebook reels, embedded via Facebook's official video plugin iframe.
// (Requires `frame-src https://www.facebook.com` in the CSP — see netlify.toml.)
const reels = [
  "https://www.facebook.com/reel/2872660553127152",
  "https://www.facebook.com/reel/1579022193741872",
  "https://www.facebook.com/reel/4497326917158794",
  "https://www.facebook.com/reel/1706436070409587",
  "https://www.facebook.com/reel/885349984155793",
  "https://www.facebook.com/reel/1612399103359106",
]
const fbEmbed = (url) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(
    url
  )}&show_text=false&width=320&height=569&appId`

const Content = () => {
  const { tr } = useLang()
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") return
    const cards = el.querySelectorAll(".reveal-card")
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("in"))
      return
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.12) e.target.classList.add("in")
          else if (e.intersectionRatio === 0) e.target.classList.remove("in")
        }),
      { threshold: [0, 0.12] }
    )
    cards.forEach((c) => io.observe(c))
    return () => io.disconnect()
  }, [])

  return (
    <>
      <Seo
        title="კონტენტი — Asymmetry სოციალურ ქსელებში"
        description="Asymmetry-ს არქიტექტურული ვიდეო კონტენტი YouTube-ზე, Instagram-ზე, TikTok-სა და Facebook-ზე — პროექტები, ვიზუალიზაცია და რჩევები, უფასოდ."
        path="/content"
      />

      <section className="ct">
        <div className="ct-hero">
          <div className="container">
            <span className="ct-badge">{tr("სოციალური ქსელები")}</span>
            <h1 className="ct-hero-title">
              {tr("არქიტექტურული კონტენტი")}{" "}
              <span className="ct-hero-accent">{tr("სოციალურ ქსელებში")}</span>
            </h1>
            <p className="ct-hero-sub">
              {tr(
                "Asymmetry ქმნის ქართულ არქიტექტურულ ვიდეო კონტენტს — პროექტები, 3D ვიზუალიზაცია და პრაქტიკული რჩევები, სახალისოდ და უფასოდ."
              )}
            </p>
            <div className="ct-hero-stats">
              <div className="ct-hero-stat">
                <b>100 000+</b>
                <span>{tr("გამომწერი 4 პლატფორმაზე")}</span>
              </div>
              <div className="ct-hero-stat">
                <b>1 000+</b>
                <span>{tr("ვიდეო და პროექტი")}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="ct-follow">
            <div className="ct-section-head">
              <h2>{tr("გამოგვყევი ყველგან")}</h2>
              <p>
                {tr(
                  "სადაც არ უნდა იყო, ჩვენი კონტენტი შენთანაა — აირჩიე პლატფორმა და შემოგვიერთდი."
                )}
              </p>
            </div>
            <div className="ct-platforms">
              {platforms.map((p) => (
                <a
                  key={p.key}
                  href={p.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`ct-platform ct-platform--${p.key}`}
                  aria-label={`${p.name} — ${p.handle}`}
                >
                  <span className="ct-platform-ico">
                    <Icon icon={p.icon} />
                  </span>
                  <span className="ct-platform-name">{p.name}</span>
                  <span className="ct-platform-handle">{p.handle}</span>
                  <span className="ct-platform-cta">
                    {tr(p.cta)} <Icon icon="mdi:arrow-right" />
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className="ct-videos">
            <div className="ct-section-head">
              <h2>{tr("ჩვენი ვიდეო კონტენტი")}</h2>
              <p>
                {tr(
                  "პროექტები, ვიზუალიზაცია და არქიტექტურული რჩევები — მარტივად და სახალისოდ. აი, რას ვქმნით ჩვენს გვერდზე."
                )}
              </p>
            </div>

            <div className="ct-reel-grid" ref={gridRef}>
              {reels.map((url, i) => (
                <div className="ct-reel reveal-card" key={i}>
                  <iframe
                    src={fbEmbed(url)}
                    title={`Asymmetry — Facebook reel ${i + 1}`}
                    loading="lazy"
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              ))}
            </div>

            <div className="ct-cta-row">
              <a
                href="https://www.facebook.com/profile.php?id=100092504264433"
                target="_blank"
                rel="noreferrer noopener"
                className="ct-cta"
              >
                <Icon icon="mdi:facebook" /> {tr("მოგვყევი Facebook-ზე")}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default Content
