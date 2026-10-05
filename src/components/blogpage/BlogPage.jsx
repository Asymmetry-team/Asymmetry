import React from "react";
import { Link } from "react-router-dom";
import Seo from "../common/Seo";
import Back from "../common/Back";
import { localPostsSorted } from "../../data/localPosts";
import { useLang } from "../../i18n";
import { localPostsEn } from "../../data/localPosts.en";
import "./blog.css";

const formatDate = (d, lang) =>
  d
    ? new Date(d).toLocaleDateString(lang === "en" ? "en-GB" : "ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogPage = () => {
  const { tr, lang } = useLang();
  // all posts are authored locally (self-hosted, no CMS), newest first
  const displayPosts = localPostsSorted;

  return (
    <>
      <Seo
        title={tr("ბლოგი | ასიმეტრია არქიტექტურული კომპანია")}
        description={tr("Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება, მშენებლობის ნებართვა და დიზაინის შესახებ სტატიები.")}
        path="/blog"
      />
      <section className="blog-page mb">
        <Back name="" title={tr("ბლოგი")} cover="" />
        <div className="container blog-list-top">
          <div className="blog-grid">
            {displayPosts.map((p) => (
              <Link to={`/blog/${p.slug}/`} className="blog-card" key={p._id}>
                <div
                  className="blog-card-img"
                  style={{ backgroundImage: `url(${p.img})` }}
                />
                <div className="blog-card-body">
                  <span className="blog-card-date">
                    {formatDate(p.publishedAt, lang)}
                  </span>
                  <h3>{lang === "en" ? localPostsEn[p.slug]?.title || tr(p.title) : p.title}</h3>
                  {p.excerpt && (
                    <p>{lang === "en" ? localPostsEn[p.slug]?.excerpt || tr(p.excerpt) : p.excerpt}</p>
                  )}
                  <span className="blog-card-more">{tr("ვრცლად →")}</span>
                </div>
              </Link>
            ))}
          </div>

          {/* marker so the build-time pre-render knows the list is ready */}
          <span data-blog-ready="1" style={{ display: "none" }} />
        </div>
      </section>
    </>
  );
};

export default BlogPage;
