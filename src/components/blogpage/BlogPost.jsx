import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Seo from "../common/Seo";
import PostCard from "./PostCard";
import { list } from "../data/Data";
import { thumb } from "../../thumb";
import { localPostBySlug } from "../../data/localPosts";
import { localPostsEn } from "../../data/localPosts.en";
import { postFaqs } from "../../data/postFaqs";
import { POST_TOPICS } from "../../data/postTopics";
import { useLang } from "../../i18n";
import { localize } from "../../i18nContent";
import { goToPriceBox, priceReadyOf, sendPriceRequest } from "../../priceRequest";
import { useGlowOnView } from "../../useGlowOnView";
import FounderBadge from "../common/FounderBadge";
import "../services/serviceLanding.css";
import "../services/arqiteqturuli.css";
import "./blog.css";
import { formatDate } from "../../formatDate";


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

// "related articles": the next posts of the same topic, in a fixed order so every
// post gets linked from others
const relatedPosts = (slug) => {
  const fallback = POST_TOPICS[1].slugs;
  const topic = (POST_TOPICS.find((t) => t.slugs.includes(slug)) || POST_TOPICS[1]).slugs;
  const i = topic.indexOf(slug);
  return [1, 2, 3]
    .map((k) => topic[(i + k) % topic.length])
    .filter((x, n, arr) => x !== slug && arr.indexOf(x) === n)
    .concat(fallback)
    .filter((x, n, arr) => x !== slug && arr.indexOf(x) === n)
    .slice(0, 3)
    .map(localPostBySlug)
    .filter(Boolean);
};
const RELATED_PROJECT_IDS = [16, 3, 17];

// the closing "კონტაქტი: …" / "Contact: …" line is replaced by the call-to-action block
const isContactLine = (b) => b.t === "p" && /^(კონტაქტი|Contact):/.test(b.c || "");
// renders the lightweight block format from src/data/localPosts.js as premium
// cards: an intro "lead" card, then one numbered card per H2 section,
// all on the light gradient with the grid lines (the H2 keeps a stable id sec-N so the floating
// table of contents can anchor to it).
// Lists become a symmetric grid of check-cards, link rows become pill buttons.
const blockHeight = (b) => {
  if (b.t === "img") return 280;
  if (b.t === "links") return 46 * Math.ceil((b.items || []).length / 2);
  if (b.t === "ul") {
    const lines = (b.items || []).map((it) => Math.ceil(String(it).length / 50));
    return (b.items || []).length * (30 + 26 * Math.max(1, ...lines));
  }
  return 26.5 * Math.ceil((b.c || "").length / 58) + 10;
};
const sectionHeight = (sec) =>
  sec.blocks.reduce(
    (h, b) => (isContactLine(b) ? h : h + blockHeight(b) + 12),
    140 + (sec.h.length > 40 ? 28 : 0)
  );
// Sections are grouped into rows so all outer edges line up. In a row, a tall section
// sits beside 2-3 short ones. Picks the row layout with the least height difference.
const FULL_ROW_COST = 90;
const layoutRows = (heights) => {
  const n = heights.length;
  const best = Array(n + 1).fill(Infinity);
  const pick = Array(n + 1).fill(null);
  best[n] = 0;
  for (let i = n - 1; i >= 0; i--) {
    if (FULL_ROW_COST + best[i + 1] < best[i]) {
      best[i] = FULL_ROW_COST + best[i + 1];
      pick[i] = { size: 1, left: [i], right: [] };
    }
    for (let size = 2; size <= 4 && i + size <= n; size++) {
      // the first section of the row always starts on the left
      for (let mask = 1; mask < 1 << size; mask += 2) {
        const left = [];
        const right = [];
        for (let k = 0; k < size; k++) (mask & (1 << k) ? left : right).push(i + k);
        // only one side may stack, so the gaps between cards never sit at two heights
        if (!right.length || (left.length > 1 && right.length > 1)) continue;
        const sum = (list) => list.reduce((t, x) => t + heights[x], 18 * (list.length - 1));
        const cost = Math.abs(sum(left) - sum(right)) + best[i + size];
        if (cost < best[i]) {
          best[i] = cost;
          pick[i] = { size, left, right };
        }
      }
    }
  }
  const rows = [];
  for (let i = 0; i < n; i += pick[i].size) rows.push(pick[i]);
  return rows;
};

const BlogBody = ({ body = [], linkTable = INLINE_LINKS, cover = null, toc = null }) => {
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

  // built in reading order, so each inline keyword still links only once
  const nodes = sections.map((sec, n) => {
          const imgs = sec.blocks.filter((b) => b.t === "img");
          const rest = sec.blocks.filter((b) => b.t !== "img" && !isContactLine(b));
          // consecutive paragraphs share one white card
          const groups = [];
          rest.forEach((b) => {
            const text = b.t === "p";
            const last = groups[groups.length - 1];
            if (text && last && last.text) last.items.push(b);
            else groups.push({ text, items: [b] });
          });
          return (
            <section
              className={"bp-sec bp-sec--half" + (imgs.length ? " bp-sec--media" : "")}
              style={{ order: n }}
              key={n}
            >
              <div className="bp-sec-head">
                <span className="bp-num">{String(n + 1).padStart(2, "0")}</span>
                <h2 id={`sec-${n}`}>{sec.h}</h2>
              </div>
              <div className="bp-sec-body">
                <div className="bp-sec-text">
                  {groups.map((g, i) =>
                    g.text ? (
                      <div className="bp-text" key={i}>
                        {g.items.map((p, j) => block(p, j, false))}
                      </div>
                    ) : (
                      block(g.items[0], i, false)
                    )
                  )}
                </div>
                {imgs.length > 0 && (
                  <div className="bp-sec-imgs">{imgs.map((b, i) => block(b, `m${i}`, false))}</div>
                )}
              </div>
            </section>
          );
  });
  // the estimate is only for the prerendered page; in the browser the real heights decide
  const secsRef = useRef(null);
  const [measured, setMeasured] = useState(null);
  useLayoutEffect(() => {
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap") return undefined;
    const measure = () => {
      const el = secsRef.current;
      if (!el || window.innerWidth <= 980) return;
      el.classList.add("bp-secs--measure");
      const h = [];
      el.querySelectorAll(".bp-sec").forEach((s) => {
        h[+s.querySelector("h2").id.slice(4)] = s.offsetHeight;
      });
      el.classList.remove("bp-secs--measure");
      setMeasured((old) => (old && old.join() === h.join() ? old : h));
    };
    measure();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [body]);
  const rows = layoutRows(
    measured && measured.length === sections.length ? measured : sections.map(sectionHeight)
  );

  return (
    <>
      <div className="bp-top">
        <div className="bp-lead">
          {intro.length > 0 && (
            <div className="bp-lead-text">{intro.map((b, i) => block(b, `i${i}`, false))}</div>
          )}
          {cover}
        </div>
        {toc}
      </div>
      <div className="bp-secs" ref={secsRef}>
        {rows.map((row, r) => (
          <div className={"bp-row" + (row.right.length ? "" : " bp-row--full")} key={r}>
            <div className="bp-col">{row.left.map((x) => nodes[x])}</div>
            {row.right.length > 0 && <div className="bp-col">{row.right.map((x) => nodes[x])}</div>}
          </div>
        ))}
      </div>
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
  const faq = postFaqs[slug] ? postFaqs[slug][en ? "en" : "ka"] : null;

  useGlowOnView(slug);
  const openContact = () =>
    window.dispatchEvent(
      new CustomEvent("asymmetry:contact", { detail: { call: true } })
    );

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
        author: {
          "@type": "Person",
          name: "ლაშა კირვალიძე",
          alternateName: "Lasha Kirvalidze",
          jobTitle: "დამფუძნებელი და მთავარი არქიტექტორი",
          worksFor: { "@type": "Organization", name: "Asymmetry", url: "https://asymmetry.ge/" },
        },
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
    // FAQPage for the "ხშირი კითხვები" block (Georgian — the indexed version)
    const faqKa = postFaqs[slug] && postFaqs[slug].ka;
    if (faqKa && faqKa.length)
      ld.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqKa.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      });
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

      <article className="blog-post sl mb">
        <header className="sl-hero bp-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">{tr("მთავარი")}</Link>
                <Icon icon="mdi:chevron-right" />
                <Link to="/blog/">{tr("ბლოგი")}</Link>
                <Icon icon="mdi:chevron-right" />
                <span>{post.title}</span>
              </nav>
              <span className="sl-eyebrow">{formatDate(post.publishedAt, lang)}</span>
              <h1 className="sl-h1 blog-post-title">{post.title}</h1>
              {post.excerpt && <p className="sl-lead">{post.excerpt}</p>}
              <FounderBadge prefix={tr("ავტორი:")} />
              <div className="sl-hero-cta">
                <button type="button" onClick={openContact} className="sl-btn sl-btn--primary">
                  <span className="sl-btn-duo" aria-hidden="true">
                    <Icon icon="mdi:phone-outline" />
                    <span className="sl-btn-duo-sep" />
                    <Icon icon="mdi:chat-outline" />
                  </span>
                  {tr("დაგვიკავშირდით")}
                </button>
                <button type="button" onClick={goToPriceBox} className="sl-btn sl-btn--primary">
                  <Icon icon="mdi:calculator-variant-outline" />
                  {tr("ფასის დათვლა")}
                </button>
              </div>
            </div>

            {/* every post opens with the price calculator — the same card as the
                architecture page's (.aq-price styles from services/arqiteqturuli.css) */}
            <section className="aq-price blog-price-top">
              <span className="aq-price-badge">
                <Icon icon="mdi:calculator-variant-outline" />
              </span>
              <h2 className="aq-price-t">{tr("არქიტექტურული მომსახურების ფასის გამოთვლა")}</h2>
              <p className="aq-price-q">{tr("რა ღირს სახლის პროექტის მერიაში შეთანხმება?")}</p>
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
                <button type="submit" className="aq-price-btn" disabled={!priceReady}>
                  {tr("ფასის დათვლა")}
                  <Icon icon="mdi:arrow-right" />
                </button>
              </form>
            </section>
          </div>
        </header>

        <div className="container blog-post-body">
          <BlogBody
            body={post.body}
            linkTable={en ? INLINE_LINKS_EN : INLINE_LINKS}
            cover={
              post.img && (
                <div className="bp-cover">
                  <img src={post.img} alt={post.imgAlt || post.title} />
                </div>
              )
            }
            toc={
              headings.length > 1 && (
                  <>
                  <aside className="blog-toc-inner blog-toc-nav-box" aria-label={tr("სტატიის სარჩევი")}>
                    <span className="blog-toc-title">{tr("ამ სტატიაში")}</span>
                    <nav className="blog-toc-nav">
                      {headings.map((h) => (
                        <a href={`#${h.id}`} key={h.id} onClick={(e) => jumpTo(e, h.id)} className="blog-toc-link">
                          {h.text}
                        </a>
                      ))}
                    </nav>
                  </aside>
                    {/* phones: the same contents, folded */}
                    <details className="bp-toc-mobile">
                      <summary>
                        <span>{tr("ამ სტატიაში")}</span>
                        <Icon icon="mdi:chevron-down" className="bp-faq-chev" />
                      </summary>
                      <nav>
                        {headings.map((h) => (
                          <a href={`#${h.id}`} key={h.id} onClick={(e) => jumpTo(e, h.id)}>
                            {h.text}
                          </a>
                        ))}
                      </nav>
                    </details>
                  </>
              )
            }
          />
          {/* FAQ — native <details> so every answer is in the HTML (SEO /
              AI answers) while the reader sees a tidy accordion */}
          {faq && faq.length > 0 && (
            <section className="bp-faq">
              <div className="bp-sec-head">
                <span className="bp-num">
                  <Icon icon="mdi:help" />
                </span>
                <h2>{tr("ხშირი კითხვები")}</h2>
              </div>
              <div className="bp-faq-grid">
                {faq.map((f, i) => (
                  <details className="bp-faq-item" key={i} open>
                    <summary>
                      <span>{f.q}</span>
                      <Icon icon="mdi:chevron-down" className="bp-faq-chev" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </section>
          )}
          <section className="bp-cta">
            <div className="bp-cta-text">
              <h2>{tr("გაქვთ ნაკვეთი? გამოგვიგზავნეთ საკადასტრო კოდი")}</h2>
              <p>{tr("უფასოდ შევამოწმებთ სამშენებლო პირობებს და ფასს წინასწარ მოგწერთ.")}</p>
            </div>
            <div className="bp-contact">
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
          </section>
        </div>

        <div className="container bp-related">
          <div className="bp-related-head">
            <h2>{tr("მსგავსი სტატიები")}</h2>
            <Link to="/blog/">{tr("ყველა სტატია →")}</Link>
          </div>
          <div className="blog-grid">
            {relatedPosts(slug).map((p) => (
              <PostCard post={p} key={p._id} />
            ))}
          </div>

          <div className="bp-related-head">
            <h2>{tr("ჩვენი პროექტები")}</h2>
            <Link to="/projects/">{tr("ყველა პროექტი →")}</Link>
          </div>
          <div className="blog-grid">
            {RELATED_PROJECT_IDS.map((id) => list.find((p) => p.id === id))
              .filter(Boolean)
              .map((p) => (
                <Link to={`/projects/${p.id}/`} className="blog-card" key={p.id}>
                  <div className="blog-card-img">
                    <img className="bg-img" src={thumb(p.images[0])} alt="" loading="lazy" />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-date">
                      <Icon icon="mdi:map-marker" /> {tr(p.location)}
                    </span>
                    <h3>{tr(p.name)}</h3>
                    <span className="blog-card-more">{tr("დეტალურად ნახვა →")}</span>
                  </div>
                </Link>
              ))}
          </div>
        </div>

        <span data-blog-ready="1" style={{ display: "none" }} />
      </article>
    </>
  );
};

export default BlogPost;
