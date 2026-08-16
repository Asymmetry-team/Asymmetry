import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// Public read-only client for the Asymmetry blog content (dataset "production").
export const client = createClient({
  projectId: "k73axqvx",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: true, // fast, cached reads of published content
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);

// list view: newest first
export const ALL_POSTS = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc){
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage
}`;

// single post by slug
export const POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  mainImage,
  body,
  author
}`;

// just the slugs — used at build time to pre-render each post
export const ALL_SLUGS = `*[_type == "post" && defined(slug.current)].slug.current`;
