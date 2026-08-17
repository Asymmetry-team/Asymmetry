// Blog posts, managed in-repo (fully pre-rendered at build time → best SEO).
//
// To add a post, add an object to this array. `body` is trusted HTML that I
// author (rendered as-is), styled by blog.css (.blog-post-body h2/h3/p/ul/…).
// Cover images go in public/images/blog/ and are referenced from the site root.
//
//   {
//     slug: "msheneblobis-nebartva-eaptebi",       // → /blog/<slug>  (SEO url)
//     title: "მშენებლობის ნებართვის აღების ეტაპები",
//     excerpt: "მოკლე აღწერა სიისა და SEO-სთვის (1–2 წინადადება).",
//     date: "2026-08-16",                           // ISO date, newest shown first
//     cover: "/images/blog/nebartva.jpg",
//     author: "ასიმეტრია",
//     body: `
//       <p>პირველი აბზაცი…</p>
//       <h2>ქვესათაური</h2>
//       <p>ტექსტი…</p>
//       <ul><li>პუნქტი</li></ul>
//     `,
//   },

export const posts = [];

export const getAllPosts = () =>
  [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));

export const getPost = (slug) => posts.find((p) => p.slug === slug);

export const allSlugs = () => posts.map((p) => p.slug);
