import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Heading from "../../common/Heading";
import { client, urlFor, ALL_POSTS } from "../../../sanity/client";
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

const BlogCarousel = () => {
  const [posts, setPosts] = useState([]);
  const trackRef = useRef(null);

  useEffect(() => {
    client
      .fetch(ALL_POSTS)
      .then((d) => setPosts(Array.isArray(d) ? d : []))
      .catch(() => {});
  }, []);

  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: "smooth" });
  };

  // nothing to show yet → don't render the section at all
  if (posts.length === 0) return null;

  return (
    <section className="blog-carousel-section padding" id="home-blog">
      <div className="container">
        <Heading accent title="ბლოგი" />
        <div className="blog-carousel-frame">
          <button
            className="carousel-arrow carousel-arrow--left"
            onClick={() => scroll(-1)}
            aria-label="წინა"
          >
            <Icon icon="mdi:chevron-left" />
          </button>

          <div className="blog-carousel-track" ref={trackRef}>
            {posts.map((p) => (
              <Link
                to={`/blog/${p.slug}`}
                className="blog-card blog-carousel-card"
                key={p._id}
              >
                {p.mainImage && (
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
                )}
                <div className="blog-card-body">
                  <span className="blog-card-date">
                    {formatDate(p.publishedAt)}
                  </span>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="blog-card-more">ვრცლად →</span>
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
    </section>
  );
};

export default BlogCarousel;
