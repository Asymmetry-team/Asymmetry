import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../common/Seo";
import Back from "../common/Back";
import { client, urlFor, ALL_POSTS } from "../../sanity/client";
import { useLang } from "../../i18n";
import "./blog.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

// Temporary placeholder articles (to be replaced with real posts later).
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

const BlogPage = () => {
  const { tr } = useLang();
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    client
      .fetch(ALL_POSTS)
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  // pad with placeholders so the grid always shows a few articles
  const displayPosts = [...posts];
  for (let i = 0; displayPosts.length < 3 && i < PLACEHOLDERS.length; i++) {
    displayPosts.push(PLACEHOLDERS[i]);
  }

  return (
    <>
      <Seo
        title="ბლოგი | Asymmetry არქიტექტურული სტუდია"
        description="Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება, მშენებლობის ნებართვა და დიზაინის შესახებ სტატიები."
        path="/blog"
      />
      <section className="blog-page mb">
        <Back name="" title={tr("ბლოგი")} cover="" />
        <div className="container blog-list-top">
          {status === "loading" && <p className="blog-empty">იტვირთება…</p>}
          {status === "error" && (
            <p className="blog-empty">
              სტატიების ჩატვირთვა ვერ მოხერხდა. სცადეთ განახლება.
            </p>
          )}
          <div className="blog-grid">
            {displayPosts.map((p) => (
              <Link
                to={p.placeholder ? "/blog-soon" : `/blog/${p.slug}`}
                className="blog-card"
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

          {/* marker so the build-time pre-render knows the fetch has resolved */}
          {status !== "loading" && (
            <span data-blog-ready="1" style={{ display: "none" }} />
          )}
        </div>
      </section>
    </>
  );
};

export default BlogPage;
