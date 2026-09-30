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

// Per-page SEO: sets <title>, description, canonical, robots and social tags.
// Dependency-free so it needs no extra npm packages.
//
// The canonical is always the page's OWN, real, final URL:
//  • pre-rendered routes live in their own folder on Netlify, which serves
//    /services/x/ and 301-redirects /services/x → /services/x/, so their
//    canonical ends in "/" (trailingSlash = true, the default);
//  • project detail pages (/projects/<id>) are NOT folders — they are served
//    as-is without a slash, which is also how Google indexed them — so they
//    pass trailingSlash={false} and get no slash appended.
// noindex pages (404) get "noindex, follow" and NO canonical at all.
const Seo = ({
  title,
  description,
  path = "/",
  image = "/images/banner.png",
  trailingSlash = true,
  noindex = false,
}) => {
  useEffect(() => {
    const clean = path.replace(/\/+$/, "") || "/";
    const canonicalPath =
      clean === "/" ? "/" : trailingSlash ? `${clean}/` : clean;
    const url = SITE_URL + canonicalPath;
    const img = image.startsWith("http") ? image : SITE_URL + image;

    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    if (noindex) {
      const c = document.head.querySelector('link[rel="canonical"]');
      if (c) c.remove();
    } else {
      upsertLink("canonical", url);
    }

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);
  }, [title, description, path, image, trailingSlash, noindex]);

  return null;
};

export default Seo;
