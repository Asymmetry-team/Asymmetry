import React from "react";
import { Link } from "react-router-dom";
import Seo from "../common/Seo";
import Back from "../common/Back";
import Heading from "../common/Heading";
import { getAllPosts } from "./posts";
import "./blog.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogPage = () => {
  const posts = getAllPosts();

  return (
    <>
      <Seo
        title="ბლოგი | Asymmetry არქიტექტურული სტუდია"
        description="Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება, მშენებლობის ნებართვა და დიზაინის შესახებ სტატიები."
        path="/blog"
      />
      <section className="blog-page mb">
        <Back name="" title="ბლოგი" cover="" />
        <div className="container">
          <Heading accent title="ბლოგი" />

          {posts.length === 0 && (
            <p className="blog-empty">მალე დაემატება პირველი სტატია. 📝</p>
          )}

          <div className="blog-grid">
            {posts.map((p) => (
              <Link to={`/blog/${p.slug}`} className="blog-card" key={p.slug}>
                {p.cover && (
                  <div
                    className="blog-card-img"
                    style={{ backgroundImage: `url(${p.cover})` }}
                  />
                )}
                <div className="blog-card-body">
                  <span className="blog-card-date">{formatDate(p.date)}</span>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="blog-card-more">ვრცლად →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
