import React from "react";
import Seo from "./Seo";
import Back from "./Back";
import { useLang } from "../../i18n";
import img from "../images/about.jpg";

// Reusable placeholder for the legal/policy pages (content added later).
const PolicyPage = ({ title, path }) => {
  const { tr } = useLang();
  return (
    <>
      <Seo title={`${tr(title)} | Asymmetry`} description={`${tr(title)} — Asymmetry.`} path={path} />
      <section className="mb">
        <Back name="" title={tr(title)} cover={img} />
        <div
          className="container"
          style={{ textAlign: "center", padding: "90px 0" }}
        >
          <h2 className="policy-soon-h">{tr("მალე...")}</h2>
          <p className="policy-soon-p">{tr("ეს გვერდი მუშავდება — მალე დაემატება.")}</p>
        </div>
      </section>
    </>
  );
};

export default PolicyPage;
