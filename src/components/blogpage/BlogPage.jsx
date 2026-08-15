import React from "react";
import Seo from "../common/Seo";
import Back from "../common/Back";
import img from "../images/about.jpg";

// Placeholder blog page — content will be added later.
const BlogPage = () => {
  return (
    <>
      <Seo
        title="ბლოგი | Asymmetry არქიტექტურული სტუდია"
        description="Asymmetry-ს ბლოგი — არქიტექტურა, პროექტირება და მშენებლობის ნებართვის შესახებ სტატიები. მალე დაემატება."
        path="/blog"
      />
      <section className="blog-page mb">
        <Back name="" title="ბლოგი" cover={img} />
        <div
          className="container"
          style={{ textAlign: "center", padding: "90px 0" }}
        >
          <h2 style={{ color: "#2d3954", marginBottom: "12px" }}>მალე...</h2>
          <p style={{ color: "#72809d" }}>
            ბლოგის სექცია მუშავდება — მალე დაემატება სტატიები.
          </p>
        </div>
      </section>
    </>
  );
};

export default BlogPage;
