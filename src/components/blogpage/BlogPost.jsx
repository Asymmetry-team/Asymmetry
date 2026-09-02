import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { PortableText } from "@portabletext/react";
import Seo from "../common/Seo";
import { client, urlFor, POST_BY_SLUG } from "../../sanity/client";
import { localPostBySlug } from "../../data/localPosts";
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

// renders the lightweight block format used by locally-authored posts
// (see src/data/localPosts.js) into the same tags the PortableText output uses
const LocalBody = ({ body = [] }) =>
  body.map((b, i) => {
    if (b.t === "h2") return <h2 key={i}>{b.c}</h2>;
    if (b.t === "h3") return <h3 key={i}>{b.c}</h3>;
    if (b.t === "ul")
      return (
        <ul key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
    // internal links row → helps crawling + spreads relevance to service pages
    if (b.t === "links")
      return (
        <p className="blog-inline-links" key={i}>
          {b.items.map((l, j) => (
            <Link to={l.to} key={j}>
              {l.label}
            </Link>
          ))}
        </p>
      );
    return <p key={i}>{b.c}</p>;
  });

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    // locally-authored posts (not in Sanity) resolve synchronously
    const local = localPostBySlug(slug);
    if (local) {
      setPost(local);
      setStatus("done");
      return;
    }
    setStatus("loading");
    client
      .fetch(POST_BY_SLUG, { slug })
      .then((data) => {
        setPost(data);
        setStatus(data ? "done" : "notfound");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  const heroUrl = post?.local
    ? post.img
    : post?.mainImage
    ? urlFor(post.mainImage).width(1920).url()
    : undefined;

  const ogImage = post?.local
    ? post.img
    : post?.mainImage
    ? urlFor(post.mainImage).width(1200).height(630).fit("crop").url()
    : undefined;

  // BlogPosting + BreadcrumbList structured data → richer blog results
  // (headline, date, author, image) and a Home › ბლოგი › post breadcrumb.
  useEffect(() => {
    if (!post) return;
    const url = `https://asymmetry.ge/blog/${slug}/`;
    const authorName = (post.author || "")
      .replace(/^ავტორი:\s*/, "")
      .split(",")[0]
      .trim() || "Asymmetry";
    const ld = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        headline: post.title,
        description: post.excerpt || post.title,
        image: ogImage ? [ogImage] : undefined,
        datePublished: post.publishedAt,
        dateModified: post.publishedAt,
        author: { "@type": "Person", name: authorName },
        publisher: {
          "@type": "Organization",
          name: "Asymmetry",
          logo: {
            "@type": "ImageObject",
            url: "https://asymmetry.ge/images/logo.png",
          },
        },
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "მთავარი", item: "https://asymmetry.ge/" },
          { "@type": "ListItem", position: 2, name: "ბლოგი", item: "https://asymmetry.ge/blog/" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ];
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.setAttribute("data-blog-ld", "1");
    el.textContent = JSON.stringify(ld);
    document.head.appendChild(el);
    return () => el.remove();
  }, [post, slug, ogImage]);

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
          <div
            className="container"
            style={{ textAlign: "center", padding: "90px 0" }}
          >
            <h2 style={{ color: "#2d3954" }}>სტატია ვერ მოიძებნა</h2>
            <Link to="/blog" className="blog-back-link">
              ← ბლოგზე დაბრუნება
            </Link>
          </div>
        )}

        {status === "done" && post && (
          <>
            {heroUrl && (
              <div
                className="blog-post-hero"
                style={{ backgroundImage: `url(${heroUrl})` }}
              />
            )}
            <div className="container blog-post-wrap">
              <Link to="/blog" className="blog-back-link">
                ← ბლოგზე დაბრუნება
              </Link>
              <span className="blog-post-date">
                {formatDate(post.publishedAt)}
              </span>
              <h1 className="blog-post-title">{post.title}</h1>
              {post.author && (
                <span className="blog-post-author">{post.author}</span>
              )}
              <div className="blog-post-body">
                {post.local ? (
                  <LocalBody body={post.body} />
                ) : (
                  post.body && (
                    <PortableText value={post.body} components={ptComponents} />
                  )
                )}
              </div>
            </div>
          </>
        )}

        {/* marker so the build-time pre-render knows the fetch has resolved */}
        {status !== "loading" && (
          <span data-blog-ready="1" style={{ display: "none" }} />
        )}
      </article>
    </>
  );
};

export default BlogPost;
