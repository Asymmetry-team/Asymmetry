import React from "react";
import { useParams, Link } from "react-router-dom";
import Seo from "../common/Seo";
import { getPost } from "./posts";
import "./blog.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getPost(slug);

  if (!post) {
    return (
      <article className="blog-post mb">
        <div
          className="container"
          style={{ textAlign: "center", padding: "90px 0" }}
        >
          <h2 style={{ color: "#2d3954" }}>სტატია ვერ მოიძებნა</h2>
          <Link to="/blog" className="blog-back-link">
            ← ბლოგზე დაბრუნება
          </Link>
        </div>
      </article>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | Asymmetry ბლოგი`}
        description={post.excerpt || post.title}
        path={`/blog/${post.slug}`}
        image={post.cover || undefined}
      />

      <article className="blog-post mb">
        {post.cover && (
          <div
            className="blog-post-hero"
            style={{ backgroundImage: `url(${post.cover})` }}
          />
        )}
        <div className="container blog-post-wrap">
          <Link to="/blog" className="blog-back-link">
            ← ბლოგზე დაბრუნება
          </Link>
          <span className="blog-post-date">{formatDate(post.date)}</span>
          <h1 className="blog-post-title">{post.title}</h1>
          {post.author && (
            <span className="blog-post-author">{post.author}</span>
          )}
          <div
            className="blog-post-body"
            dangerouslySetInnerHTML={{ __html: post.body || "" }}
          />
        </div>
      </article>
    </>
  );
};

export default BlogPost;
