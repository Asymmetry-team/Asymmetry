import React from "react";
import Seo from "./Seo";
import Back from "./Back";
import img from "../images/about.jpg";

// Reusable placeholder for the legal/policy pages (content added later).
const PolicyPage = ({ title, path }) => {
  return (
    <>
      <Seo title={`${title} | Asymmetry`} description={`${title} — Asymmetry.`} path={path} />
      <section className="mb">
        <Back name="" title={title} cover={img} />
        <div
          className="container"
          style={{ textAlign: "center", padding: "90px 0" }}
        >
          <h2 style={{ color: "#2d3954", marginBottom: "12px" }}>მალე...</h2>
          <p style={{ color: "#72809d" }}>ეს გვერდი მუშავდება — მალე დაემატება.</p>
        </div>
      </section>
    </>
  );
};

export default PolicyPage;
