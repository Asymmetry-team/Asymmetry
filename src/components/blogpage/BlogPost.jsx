import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Seo from "../common/Seo";
import { client, urlFor, POST_BY_SLUG } from "../../sanity/client";
import "./blog.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

// how Portable Text (rich text from Sanity) is rendered
const ptComponents = {
  types: {
    image: ({ value }) =>
      value?.asset ? (
        <img
          className="blog-body-img"
          src={urlFor(value).width(1100).fit("max").url()}
          alt={value.alt || ""}
          loading="lazy"
        />
      ) : null,
  },
  marks: {
    link: ({ children, value }) => (
      <a href={value?.href} target="_blank" rel="noreferrer">
        {children}
      </a>
    ),
  },
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    client
      .fetch(POST_BY_SLUG, { slug })
      .then((data) => {
        setPost(data);
        setStatus(data ? "done" : "notfound");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  const ogImage =
    post?.mainImage ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url() : undefined;

  return (
    <>
      {post && (
        <Seo
          title={`${post.title} | Asymmetry ბლოგი`}
          description={post.excerpt || post.title}
          path={`/blog/${slug}`}
          image={ogImage}
        />
      )}

      <article className="blog-post mb">
        {status === "loading" && (
          <div className="container">
            <p className="blog-empty">იტვირთება…</p>
          </div>
        )}
        {(status === "notfound" || status === "error") && (
          <div className="container" style={{ textAlign: "center", padding: "90px 0" }}>
            <h2 style={{ color: "#2d3954" }}>სტატია ვერ მოიძებნა</h2>
            <Link to="/blog" className="blog-back-link">
              ← ბლოგზე დაბრუნება
            </Link>
          </div>
        )}

        {status === "done" && post && (
          <>
            {post.mainImage && (
              <div
                className="blog-post-hero"
                style={{
                  backgroundImage: `url(${urlFor(post.mainImage)
                    .width(1600)
                    .height(720)
                    .fit("crop")
                    .url()})`,
                }}
              />
            )}
            <div className="container blog-post-wrap">
              <Link to="/blog" className="blog-back-link">
                ← ბლოგზე დაბრუნება
              </Link>
              <span className="blog-post-date">{formatDate(post.publishedAt)}</span>
              <h1 className="blog-post-title">{post.title}</h1>
              {post.author && (
                <span className="blog-post-author">{post.author}</span>
              )}
              <div className="blog-post-body">
                {post.body && (
                  <PortableText value={post.body} components={ptComponents} />
                )}
              </div>
            </div>
          </>
        )}
      </article>
    </>
  );
};

export default BlogPost;
