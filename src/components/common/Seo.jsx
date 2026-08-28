import { useEffect } from "react";

// Central place for the production domain used in canonical / OG URLs.
const SITE_URL = "https://asymmetry.ge";

// Create the meta tag if missing, then set its content.
const upsertMeta = (attr, key, content) => {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
};

const upsertLink = (rel, href) => {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
};

// Per-page SEO: sets <title>, description, canonical and social tags.
// Dependency-free so it needs no extra npm packages.
const Seo = ({ title, description, path = "/", image = "/images/banner.png" }) => {
  useEffect(() => {
    // Netlify serves every pre-rendered sub-route from its own folder and
    // 301-redirects the no-slash URL to the trailing-slash one
    // (/services/x → /services/x/). Canonical + og:url must point at that
    // final URL, otherwise the canonical target just redirects back here and
    // Google sees a self-conflicting signal. Root stays "/".
    const canonicalPath = path === "/" ? "/" : path.replace(/\/?$/, "/");
    const url = SITE_URL + canonicalPath;
    const img = image.startsWith("http") ? image : SITE_URL + image;

    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertLink("canonical", url);

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image]);

  return null;
};

export default Seo;
