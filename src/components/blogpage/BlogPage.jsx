import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Seo from "../common/Seo";
import PostCard from "./PostCard";
import { localPostsSorted, localPostBySlug } from "../../data/localPosts";
import { POST_TOPICS } from "../../data/postTopics";
import { useLang } from "../../i18n";
import "../services/serviceLanding.css";
import "./blog.css";

// the article readers look for most — sits in the hero
const FEATURED_SLUG = "kerdzo-sakhlis-proektireba-pasi-vadebi-da-shetankhmeba";

const BlogPage = () => {
  const { tr } = useLang();
  const [topic, setTopic] = useState(null);
  const featured = localPostBySlug(FEATURED_SLUG);
  // all posts are authored locally (self-hosted, no CMS), newest first
  const active = POST_TOPICS.find((t) => t.key === topic);
  const displayPosts = localPostsSorted.filter(
    (p) => p.slug !== FEATURED_SLUG && (!active || active.slugs.includes(p.slug))
  );

  return (
    <>
      <Seo
        title={tr("ბლოგი | ასიმეტრია არქიტექტურული კომპანია")}
        description={tr("Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება, მშენებლობის ნებართვა და დიზაინის შესახებ სტატიები.")}
        path="/blog"
      />
      <section className="blog-page sl mb">
        <header className="sl-hero bp-hero">
          <div className="sl-hero-grid container">
            <div className="sl-hero-copy">
              <nav className="sl-crumbs" aria-label="breadcrumb">
                <Link to="/">{tr("მთავარი")}</Link>
                <Icon icon="mdi:chevron-right" />
                <span>{tr("ბლოგი")}</span>
              </nav>
              <h1 className="sl-h1">{tr("ბლოგი")}</h1>
              <p className="sl-lead">
                {tr("სტატიები სახლის პროექტზე, ფასზე, მშენებლობის ნებართვასა და მასალებზე — ასიმეტრიის არქიტექტორებისგან.")}
              </p>
              <div className="sl-hero-cta">
                <Link to="/projects/" className="sl-btn sl-btn--ghost">
                  <Icon icon="mdi:image-multiple-outline" />
                  {tr("ჩვენი პროექტები")}
                </Link>
              </div>
            </div>
            {featured && <PostCard post={featured} className="blog-card--featured" />}
          </div>
        </header>

        <div className="container blog-list-top">
          <div className="blog-filters" role="group" aria-label={tr("თემები")}>
            <button
              type="button"
              className={"blog-filter" + (!topic ? " active" : "")}
              aria-pressed={!topic}
              onClick={() => setTopic(null)}
            >
              {tr("ყველა")}
            </button>
            {POST_TOPICS.map((t) => (
              <button
                type="button"
                key={t.key}
                className={"blog-filter" + (topic === t.key ? " active" : "")}
                aria-pressed={topic === t.key}
                onClick={() => setTopic(t.key)}
              >
                {tr(t.label)}
              </button>
            ))}
          </div>
          <div className="blog-grid">
            {displayPosts.map((p) => (
              <PostCard post={p} key={p._id} />
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
