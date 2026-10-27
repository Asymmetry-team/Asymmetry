import { useEffect } from "react";
import { isEnPath } from "../../i18n";

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
  // the page's above-the-fold image (LCP) — preloaded so it starts downloading
  // with the HTML instead of after the CSS/JS. One per page; replaced on navigation.
  preloadImage,
  // optional responsive variant of the same preload (imagesrcset/imagesizes),
  // for a hero whose CSS swaps in a smaller file on phones
  preloadSrcset,
  preloadSizes,
}) => {
  useEffect(() => {
    const clean = path.replace(/\/+$/, "") || "/";
    const canonicalPath =
      clean === "/" ? "/" : trailingSlash ? `${clean}/` : clean;
    // every page exists twice: Georgian at /x/ and English at /en/x/
    const kaUrl = SITE_URL + canonicalPath;
    const enUrl = SITE_URL + (canonicalPath === "/" ? "/en/" : `/en${canonicalPath}`);
    const en = isEnPath();
    const url = en ? enUrl : kaUrl;
    const img = image.startsWith("http") ? image : SITE_URL + image;

    if (title) document.title = title;
    upsertMeta("name", "description", description);
    upsertMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    if (noindex) {
      const c = document.head.querySelector('link[rel="canonical"]');
      if (c) c.remove();
      document.head
        .querySelectorAll('link[rel="alternate"][hreflang]')
        .forEach((l) => l.remove());
    } else {
      upsertLink("canonical", url);
      // hreflang pair (+ x-default → Georgian) so search engines show each
      // visitor the right language and treat the two as one page
      [
        ["ka", kaUrl],
        ["en", enUrl],
        ["x-default", kaUrl],
      ].forEach(([hl, href]) => {
        let el = document.head.querySelector(`link[rel="alternate"][hreflang="${hl}"]`);
        if (!el) {
          el = document.createElement("link");
          el.setAttribute("rel", "alternate");
          el.setAttribute("hreflang", hl);
          document.head.appendChild(el);
        }
        el.setAttribute("href", href);
      });
    }
    upsertMeta("property", "og:locale", en ? "en_US" : "ka_GE");

    upsertMeta("property", "og:title", title);
    upsertMeta("property", "og:description", description);
    upsertMeta("property", "og:url", url);
    upsertMeta("property", "og:image", img);

    upsertMeta("name", "twitter:title", title);
    upsertMeta("name", "twitter:description", description);
    upsertMeta("name", "twitter:image", img);

    let pre = document.head.querySelector('link[rel="preload"][data-lcp]');
    if (preloadImage) {
      if (!pre) {
        pre = document.createElement("link");
        pre.setAttribute("rel", "preload");
        pre.setAttribute("as", "image");
        pre.setAttribute("fetchpriority", "high");
        pre.setAttribute("data-lcp", "");
        document.head.appendChild(pre);
      }
      pre.setAttribute("href", preloadImage);
      if (preloadSrcset) {
        pre.setAttribute("imagesrcset", preloadSrcset);
        pre.setAttribute("imagesizes", preloadSizes || "100vw");
      } else {
        pre.removeAttribute("imagesrcset");
        pre.removeAttribute("imagesizes");
      }
    } else if (pre) {
      pre.remove();
    }
  }, [title, description, path, image, trailingSlash, noindex, preloadImage, preloadSrcset, preloadSizes]);

  return null;
};

export default Seo;
