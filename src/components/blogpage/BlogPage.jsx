import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Seo from "../common/Seo";
import Back from "../common/Back";
import Heading from "../common/Heading";
import { client, urlFor, ALL_POSTS } from "../../sanity/client";
import img from "../images/about.jpg";
import "./blog.css";

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("ka-GE", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

const BlogPage = () => {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    client
      .fetch(ALL_POSTS)
      .then((data) => {
        setPosts(Array.isArray(data) ? data : []);
        setStatus("done");
      })
      .catch(() => setStatus("error"));
  }, []);

  return (
    <>
      <Seo
        title="ბლოგი | Asymmetry არქიტექტურული სტუდია"
        description="Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება, მშენებლობის ნებართვა და დიზაინის შესახებ სტატიები."
        path="/blog"
      />
      <section className="blog-page mb">
        <Back name="" title="ბლოგი" cover={img} />
        <div className="container">
          <Heading accent title="ბლოგი" />

          {status === "loading" && (
            <p className="blog-empty">იტვირთება…</p>
          )}
          {status === "error" && (
            <p className="blog-empty">
              სტატიების ჩატვირთვა ვერ მოხერხდა. სცადეთ განახლება.
            </p>
          )}
          {status === "done" && posts.length === 0 && (
            <p className="blog-empty">მალე დაემატება პირველი სტატია. 📝</p>
          )}

          <div className="blog-grid">
            {posts.map((p) => (
              <Link to={`/blog/${p.slug}`} className="blog-card" key={p._id}>
                {p.mainImage && (
                  <div
                    className="blog-card-img"
                    style={{
                      backgroundImage: `url(${urlFor(p.mainImage)
                        .width(760)
                        .height(460)
                        .fit("crop")
                        .url()})`,
                    }}
                  />
                )}
                <div className="blog-card-body">
                  <span className="blog-card-date">
                    {formatDate(p.publishedAt)}
                  </span>
                  <h3>{p.title}</h3>
                  {p.excerpt && <p>{p.excerpt}</p>}
                  <span className="blog-card-more">ვრცლად →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
