import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Heading from "../../common/Heading";
import { client, urlFor, ALL_POSTS } from "../../../sanity/client";
import { useLang } from "../../../i18n";
import "../../blogpage/blog.css";
import "./blogCarousel.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

// Temporary placeholder posts so the carousel always has a few cards to show
// (the user will replace these with real blog posts later). They link to /blog.
const PLACEHOLDERS = [
  {
    _id: "ph-1",
    placeholder: true,
    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=760&h=460&fit=crop",
    title: "ინტერიერის დიზაინის ტენდენციები 2026",
    excerpt: "მასალები, ფერები და გადაწყვეტები, რომლებიც წელს დომინირებს.",
    publishedAt: "2026-08-10",
  },
  {
    _id: "ph-2",
    placeholder: true,
    img: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=760&h=460&fit=crop",
    title: "მშენებლობის ნებართვა: ნაბიჯ-ნაბიჯ გზამკვლევი",
    excerpt: "რა დოკუმენტები დაგჭირდებათ და როგორ დავზოგოთ დრო.",
    publishedAt: "2026-07-28",
  },
];

const BlogCarousel = () => {
  const { t, tr } = useLang();
  const [posts, setPosts] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    client
      .fetch(ALL_POSTS)
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  // pad with placeholders so at least 3 cards show (desktop shows 3)
  const displayPosts = [...posts];
  for (let i = 0; displayPosts.length < 3 && i < PLACEHOLDERS.length; i++) {
    displayPosts.push(PLACEHOLDERS[i]);
  }

  // Same smooth fade-up reveal as the service & project cards: each card
  // animates in when it scrolls into view and replays after it fully leaves.
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return;
    const cards = el.querySelectorAll(".reveal-card");
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.intersectionRatio >= 0.15) e.target.classList.add("in");
          else if (e.intersectionRatio === 0) e.target.classList.remove("in");
        }),
      { threshold: [0, 0.15] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [posts.length]);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // nothing to show yet → don't render the section at all
  if (displayPosts.length === 0) return null;

  return (
    <section className="blog-carousel-section padding" id="home-blog">
      <div className="container">
        <div className="carousel-bubble">
        <Link to="/blog" className="home-section-link">
          <Heading accent title={t("home.blog")} />
        </Link>
        <div className="blog-carousel-frame">
          <button
            className="carousel-arrow carousel-arrow--left"
            onClick={() => scroll(-1)}
            aria-label="წინა"
          >
            <Icon icon="mdi:chevron-left" />
          </button>

          <div className="blog-carousel-track" ref={trackRef}>
            {displayPosts.map((p) => (
              <Link
                to={p.placeholder ? "/blog-soon" : `/blog/${p.slug}`}
                className="blog-card blog-carousel-card reveal-card"
                key={p._id}
              >
                {p.placeholder ? (
                  <div
                    className="blog-card-img"
                    style={{ backgroundImage: `url(${p.img})` }}
                  />
                ) : (
                  p.mainImage && (
                    <div
                      className="blog-card-img"
                      style={{
                        backgroundImage: `url(${urlFor(p.mainImage)
                          .width(760)
                          .height(460)
                          .fit("crop")
                          .url()})`,
                      }}
                    />
                  )
                )}
                <div className="blog-card-body">
                  <span className="blog-card-date">
                    {formatDate(p.publishedAt)}
                  </span>
                  <h3>{tr(p.title)}</h3>
                  {p.excerpt && <p>{tr(p.excerpt)}</p>}
                  <span className="blog-card-more">{tr("ვრცლად →")}</span>
                </div>
              </Link>
            ))}
          </div>

          <button
            className="carousel-arrow carousel-arrow--right"
            onClick={() => scroll(1)}
            aria-label="შემდეგი"
          >
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;
