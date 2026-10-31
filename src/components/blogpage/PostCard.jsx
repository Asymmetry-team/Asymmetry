import React from "react";
import { Link } from "react-router-dom";
import { thumb } from "../../thumb";
import { useLang } from "../../i18n";
import { localPostsEn } from "../../data/localPosts.en";
import { formatDate } from "../../formatDate";

// one article card — blog list, its featured slot and "related articles"
const PostCard = ({ post, className = "" }) => {
  const { tr, lang } = useLang();
  const en = lang === "en" ? localPostsEn[post.slug] : null;
  const title = lang === "en" ? en?.title || tr(post.title) : post.title;
  const excerpt = lang === "en" ? en?.excerpt || tr(post.excerpt) : post.excerpt;
  return (
    <Link to={`/blog/${post.slug}/`} className={"blog-card " + className}>
      <div className="blog-card-img">
        <img className="bg-img" src={thumb(post.img)} alt="" loading="lazy" />
      </div>
      <div className="blog-card-body">
        <span className="blog-card-date">{formatDate(post.publishedAt, lang)}</span>
        <h3>{title}</h3>
        {excerpt && <p>{excerpt}</p>}
        <span className="blog-card-more">{tr("ვრცლად →")}</span>
      </div>
    </Link>
  );
};

export default PostCard;
