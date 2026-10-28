import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Seo from "../common/Seo";
import { localPostBySlug } from "../../data/localPosts";
import { localPostsEn } from "../../data/localPosts.en";
import { useLang } from "../../i18n";
import { localize } from "../../i18nContent";
import { priceReadyOf, sendPriceRequest, PRICE_TOP_ARCH } from "../../priceRequest";
import "./blog.css";

const formatDate = (d, lang) =>
  d
    ? new Date(d).toLocaleDateString(lang === "en" ? "en-GB" : "ka-GE", {
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
// same idea for the English text (EN is client-side only; no SEO weight, just
// navigation). Matched case-sensitively, first occurrence only.
const INLINE_LINKS_EN = [
  ["architectural services", "/services/arqiteqturuli-momsakhureba/"],
  ["Architectural services", "/services/arqiteqturuli-momsakhureba/"],
  ["private house", "/services/kerdzo-sakhlis-proeqtireba/"],
  ["Class I building", "/services/1-klasis-shenobis-proeqtireba/"],
  ["structural design", "/services/konstruqciuli-momsakhureba/"],
  ["geological survey", "/services/geologiuri-momsakhureba/"],
  ["3D visualisation", "/process/koncefcia/"],
  ["architect's supervision", "/process/avtoris-zedamxedveloba/"],
  ["building permit", "/blog/msheneblobis-nebartvis-agheba-sakartveloshi/"],
  ["free consultation", "/contact/"],
];

// turn a plain paragraph string into text + contextual <Link> nodes; each
// keyword links at most once per article (shared `used` set)
const linkify = (text, used, table = INLINE_LINKS) => {
  let best = null;
  for (const [kw, to] of table) {
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
    ...linkify(after, used, table),
  ];
};

// the closing "კონტაქტი: …" / "Contact: …" line becomes call / e-mail buttons
const isContactLine = (b) => b.t === "p" && /^(კონტაქტი|Contact):/.test(b.c || "");
// renders the lightweight block format from src/data/localPosts.js as premium
// cards: an intro "lead" card, then one numbered card per H2 section,
// alternating dark / light (the H2 keeps a stable id sec-N so the floating
// table of contents can anchor to it).
// Lists become a symmetric grid of check-cards, link rows become pill buttons.
const BlogBody = ({ body = [], linkTable = INLINE_LINKS }) => {
  const used = new Set();

  // split into the intro (blocks before the first H2) and H2 sections
  const intro = [];
  const sections = [];
  body.forEach((b) => {
    if (b.t === "h2") sections.push({ h: b.c, blocks: [] });
    else if (sections.length) sections[sections.length - 1].blocks.push(b);
    else intro.push(b);
  });

  const block = (b, i, dark) => {
    if (isContactLine(b))
      return (
        <div className="bp-contact" key={i}>
          <a href="tel:+995571141469" className="bp-btn bp-btn--solid">
            <Icon icon="mdi:phone" /> +995 571 14 14 69
          </a>
          <a href="https://wa.me/995571141469" className="bp-btn" target="_blank" rel="noopener noreferrer">
            <Icon icon="mdi:whatsapp" /> WhatsApp
          </a>
          <a href="mailto:connectasymmetry@gmail.com" className="bp-btn">
            <Icon icon="mdi:email-outline" /> connectasymmetry@gmail.com
          </a>
        </div>
      );
    if (b.t === "h3") return <h3 key={i}>{b.c}</h3>;
    if (b.t === "img")
      return (
        <img className="blog-body-img" src={b.src} alt={b.alt || ""} loading="lazy" key={i} />
      );
    if (b.t === "ul")
      return (
        <ul className={"bp-grid" + (b.items.length === 1 ? " bp-grid--one" : "")} key={i}>
          {b.items.map((it, j) => (
            <li key={j}>
              <span className="bp-check" aria-hidden="true">
                <Icon icon="mdi:check" />
              </span>
              <span>{it}</span>
            </li>
          ))}
        </ul>
      );
    if (b.t === "links")
      return (
        <p className={"blog-inline-links" + (dark ? " blog-inline-links--dark" : "")} key={i}>
          {b.items.map((l, j) => (
            <Link to={l.to} key={j}>
              {l.label}
            </Link>
          ))}
        </p>
      );
    return <p key={i}>{linkify(b.c, used, linkTable)}</p>;
  };

  return (
    <>
      {intro.length > 0 && (
        <div className="bp-lead">{intro.map((b, i) => block(b, `i${i}`, false))}</div>
      )}
      {sections.map((s, n) => {
        // 01 dark, 02 light, 03 dark … — continues the rhythm of the dark
        // calculator and the light intro above
        const dark = n % 2 === 0;
        return (
          <section className={"bp-sec" + (dark ? " bp-sec--dark" : "")} key={n}>
            <div className="bp-sec-head">
              <span className="bp-num">{String(n + 1).padStart(2, "0")}</span>
              <h2 id={`sec-${n}`}>{s.h}</h2>
            </div>
            <div className="bp-sec-body">{s.blocks.map((b, i) => block(b, i, dark))}</div>
          </section>
        );
      })}
    </>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const { tr, lang } = useLang();
  const en = lang === "en";
  // Georgian is the source (and what JSON-LD describes); EN overlays it
  const postKa = localPostBySlug(slug);
  const post = useMemo(
    () => (en && postKa ? localize(postKa, localPostsEn[slug]) : postKa),
    [en, postKa, slug]
  );

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

  // inline price estimate (cadastral code + avg m²) — on submit opens the
  // WhatsApp/Messenger chooser with the details pre-filled, exactly like the
  // service pages' price form
  const [cad, setCad] = useState("");
  const [sqm, setSqm] = useState("");
  const priceReady = priceReadyOf(cad, sqm);
  const submitPrice = (e) => {
    e.preventDefault();
    if (!priceReady) return;
    sendPriceRequest(lang, cad, sqm);
  };
  const priceArch = PRICE_TOP_ARCH.includes(slug);
  // live ballpark from the published 10–40 ₾/m² range while the area is typed;
  // the exact, fixed price still comes via WhatsApp/Messenger
  const sqmNum = parseFloat(String(sqm).replace(",", "."));
  const estimate =
    sqmNum > 0 && sqmNum < 100000
      ? [sqmNum * 10, sqmNum * 40].map((v) =>
          String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, " ")
        )
      : null;

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
      const y = el.getBoundingClientRect().top + window.scrollY - 160;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  // BlogPosting + BreadcrumbList structured data
  useEffect(() => {
    const post = postKa;
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
  }, [postKa, slug]);

  if (!post) {
    return (
      <article className="blog-post mb">
        <div
          className="container"
          style={{ textAlign: "center", padding: "90px 0" }}
        >
          <h2 style={{ color: "#2d3954" }}>{tr("სტატია ვერ მოიძებნა")}</h2>
          <Link to="/blog/" className="blog-back-link">
            {"← " + tr("ბლოგზე დაბრუნება")}
          </Link>
        </div>
        <span data-blog-ready="1" style={{ display: "none" }} />
      </article>
    );
  }

  return (
    <>
      <Seo
        title={`${post.title} | ${en ? "Asymmetry Blog" : "Asymmetry ბლოგი"}`}
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

        <div className="blog-post-shell">
          {/* article card */}
          <div className="blog-post-wrap">
            <Link to="/blog/" className="blog-back-link">
              {"← " + tr("ბლოგზე დაბრუნება")}
            </Link>
            <span className="blog-post-date">
              {formatDate(post.publishedAt, lang)}
            </span>
            <h1 className="blog-post-title">{post.title}</h1>
            {post.author && (
              <span className="blog-post-author">{post.author}</span>
            )}
            {/* every post opens with the price calculator — the same card as the
                architecture page's (.aq-price styles from services/arqiteqturuli.css) */}
            <section className="aq-price blog-price-top">
              <span className="aq-price-badge">
                <Icon icon="mdi:calculator-variant-outline" />
              </span>
              <h2 className="aq-price-t">{priceArch ? tr("არქიტექტურული პროექტის ფასის გამოთვლა") : tr("სახლის პროექტის ფასის გამოთვლა")}</h2>
              <p className="aq-price-q">{priceArch ? tr("რა ღირს არქიტექტურული პროექტი?") : tr("რა ღირს სახლის პროექტი?")}</p>
              <p className="aq-price-sub">{tr("შეავსეთ ველები — ფასს მოგწერთ")}</p>
              <form className="aq-price-form" onSubmit={submitPrice}>
                <div className="aq-price-field">
                  <label htmlFor="aqp-cad">{tr("მიწის საკადასტრო კოდი")}</label>
                  <div className="aq-price-input">
                    <Icon icon="mdi:barcode" />
                    <input
                      id="aqp-cad"
                      type="text"
                      inputMode="numeric"
                      placeholder={tr("მაგ. 01.10.14.005.123")}
                      value={cad}
                      onChange={(e) => setCad(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
                <div className="aq-price-field">
                  <label htmlFor="aqp-sqm">{tr("შენობის საშუალო კვადრატულობა (მ²)")}</label>
                  <div className="aq-price-input">
                    <Icon icon="mdi:home-outline" />
                    <input
                      id="aqp-sqm"
                      type="text"
                      inputMode="decimal"
                      placeholder={tr("მაგ. 240")}
                      value={sqm}
                      onChange={(e) => setSqm(e.target.value)}
                      autoComplete="off"
                    />
                  </div>
                </div>
                {estimate && (
                  <p className="blog-price-est" aria-live="polite">
                    {tr("სავარაუდო ფასი")}: <b>{estimate[0]} – {estimate[1]} ₾</b>
                    <span>{tr("ზუსტ, ფიქსირებულ ფასს მოგწერთ")}</span>
                  </p>
                )}
                <button type="submit" className="aq-price-btn" disabled={!priceReady}>
                  {tr("ფასის დათვლა")}
                  <Icon icon="mdi:arrow-right" />
                </button>
              </form>
            </section>
            <div className="blog-post-body" ref={bodyRef}>
              <BlogBody body={post.body} linkTable={en ? INLINE_LINKS_EN : INLINE_LINKS} />
            </div>
          </div>

          {/* floating panel — sits beside the card (outside it), sticks while
              scrolling and tracks the section you're reading */}
          <aside className="blog-toc" aria-label={tr("სტატიის სარჩევი")}>
            {/* bubble 1 — table of contents */}
            {headings.length > 1 && (
              <div className="blog-toc-inner blog-toc-nav-box">
                <span className="blog-toc-title">{tr("ამ სტატიაში")}</span>
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
              </div>
            )}
          </aside>
        </div>

        <span data-blog-ready="1" style={{ display: "none" }} />
      </article>
    </>
  );
};

export default BlogPost;
