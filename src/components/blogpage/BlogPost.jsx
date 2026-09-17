import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Seo from "../common/Seo";
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

// keyword → internal page. The first (un-used) occurrence of each keyword in
// the article body is turned into a contextual link to the relevant service /
// process / blog page — spreads relevance and helps the reader navigate.
// Longer / more specific keywords first so they win over shorter ones.
const INLINE_LINKS = [
  ["არქიტექტურული მომსახურება", "/services/arqiteqturuli-momsakhureba/"],
  ["კერძო სახლის პროექტირება", "/services/kerdzo-sakhlis-proeqtireba/"],
  ["1 კლასის შენობა", "/services/1-klasis-shenobis-proeqtireba/"],
  ["კონსტრუქციული პროექტი", "/services/konstruqciuli-momsakhureba/"],
  ["გეოლოგიური კვლევა", "/services/geologiuri-momsakhureba/"],
  ["გეოდეზიური სამუშაოები", "/services/geodeziuri-samushaoebi/"],
  ["3D ვიზუალიზაცია", "/process/koncefcia/"],
  ["ავტორის ზედამხედველობა", "/process/avtoris-zedamxedveloba/"],
  ["მშენებლობის ნებართვა", "/blog/msheneblobis-nebartvis-agheba-sakartveloshi/"],
  ["პროექტის შეთანხმება", "/process/samushao-proeqti/"],
  ["უფასო კონსულტაცია", "/contact/"],
  ["კონსულტაცია", "/process/konsultacia/"],
];

// turn a plain paragraph string into text + contextual <Link> nodes; each
// keyword links at most once per article (shared `used` set)
const linkify = (text, used) => {
  let best = null;
  for (const [kw, to] of INLINE_LINKS) {
    if (used.has(kw)) continue;
    const idx = text.indexOf(kw);
    if (idx !== -1 && (best === null || idx < best.idx)) best = { kw, to, idx };
  }
  if (!best) return [text];
  used.add(best.kw);
  const before = text.slice(0, best.idx);
  const after = text.slice(best.idx + best.kw.length);
  return [
    before,
    <Link key={best.kw + best.idx} to={best.to} className="blog-inlink">
      {best.kw}
    </Link>,
    ...linkify(after, used),
  ];
};

// renders the lightweight block format from src/data/localPosts.js, assigning
// each H2 a stable id (sec-N) so the floating table of contents can anchor to it
const BlogBody = ({ body = [] }) => {
  const used = new Set();
  let h = -1;
  return body.map((b, i) => {
    if (b.t === "h2") {
      h += 1;
      return (
        <h2 id={`sec-${h}`} key={i}>
          {b.c}
        </h2>
      );
    }
    if (b.t === "h3") return <h3 key={i}>{b.c}</h3>;
    if (b.t === "img")
      return (
        <img
          className="blog-body-img"
          src={b.src}
          alt={b.alt || ""}
          loading="lazy"
          key={i}
        />
      );
    if (b.t === "ul")
      return (
        <ul key={i}>
          {b.items.map((it, j) => (
            <li key={j}>{it}</li>
          ))}
        </ul>
      );
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
    return <p key={i}>{linkify(b.c, used)}</p>;
  });
};

const BlogPost = () => {
  const { slug } = useParams();
  const post = localPostBySlug(slug);

  // section headings for the floating table of contents
  const headings = useMemo(() => {
    if (!post) return [];
    let h = -1;
    return (post.body || [])
      .filter((b) => b.t === "h2")
      .map((b) => {
        h += 1;
        return { id: `sec-${h}`, text: b.c };
      });
  }, [post]);

  const [activeId, setActiveId] = useState(null);
  const [progress, setProgress] = useState(0);
  const bodyRef = useRef(null);

  // highlight the section currently in view
  useEffect(() => {
    if (!post || !headings.length) return;
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter(Boolean);
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveId(e.target.id);
        });
      },
      { rootMargin: "-18% 0px -72% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [post, headings]);

  // reading-progress for the little bar in the panel
  useEffect(() => {
    if (!post) return;
    const onScroll = () => {
      const el = bodyRef.current;
      if (!el) return;
      const span = el.offsetHeight - window.innerHeight;
      const done = span > 0 ? (window.scrollY - el.offsetTop) / span : 0;
      setProgress(Math.min(1, Math.max(0, done)));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [post]);

  const jumpTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 84;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // BlogPosting + BreadcrumbList structured data
  useEffect(() => {
    if (!post) return;
    const url = `https://asymmetry.ge/blog/${slug}/`;
    const authorName =
      (post.author || "")
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
        image: post.img ? [`https://asymmetry.ge${post.img}`] : undefined,
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
  }, [post, slug]);

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
        <span data-blog-ready="1" style={{ display: "none" }} />
      </article>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | Asymmetry ბლოგი`}
        description={post.excerpt || post.title}
        path={`/blog/${slug}`}
        image={post.img}
      />

      <article className="blog-post mb">
        {post.img && (
          <div
            className="blog-post-hero"
            style={{ backgroundImage: `url(${post.img})` }}
          />
        )}

        <div className="container blog-post-wrap">
          <Link to="/blog" className="blog-back-link">
            ← ბლოგზე დაბრუნება
          </Link>

          <div className="blog-post-layout">
            <div className="blog-post-main">
              <span className="blog-post-date">
                {formatDate(post.publishedAt)}
              </span>
              <h1 className="blog-post-title">{post.title}</h1>
              {post.author && (
                <span className="blog-post-author">{post.author}</span>
              )}
              <div className="blog-post-body" ref={bodyRef}>
                <BlogBody body={post.body} />
              </div>
            </div>

            {/* floating panel — sticks while scrolling, tracks the section you
                are reading and offers a quick jump + a free-consultation CTA */}
            {headings.length > 1 && (
              <aside className="blog-toc" aria-label="სტატიის სარჩევი">
                <div className="blog-toc-inner">
                  <span className="blog-toc-title">ამ სტატიაში</span>
                  <div className="blog-toc-progress">
                    <span style={{ transform: `scaleX(${progress})` }} />
                  </div>
                  <nav className="blog-toc-nav">
                    {headings.map((h) => (
                      <a
                        href={`#${h.id}`}
                        key={h.id}
                        onClick={(e) => jumpTo(e, h.id)}
                        className={
                          "blog-toc-link" +
                          (activeId === h.id ? " active" : "")
                        }
                      >
                        {h.text}
                      </a>
                    ))}
                  </nav>
                  <div className="blog-toc-cta">
                    <p>გაქვთ პროექტი შესათანხმებელი?</p>
                    <Link to="/contact" className="blog-toc-btn">
                      <Icon icon="mdi:message-text-outline" />
                      უფასო კონსულტაცია
                    </Link>
                  </div>
                </div>
              </aside>
            )}
          </div>
        </div>

        <span data-blog-ready="1" style={{ display: "none" }} />
      </article>
    </>
  );
};

export default BlogPost;
