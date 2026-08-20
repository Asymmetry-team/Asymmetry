import React from "react";
import { useLang } from "../../i18n";

// Premium typographic sub-page banner: brand wordmark (elegant serif) over a
// deep brand-gradient, with the page title underneath. No photo needed.
const Back = ({ title }) => {
  const { lang } = useLang();
  return (
    <div className="back">
      <div className="back-inner">
        <span className="back-brand">ASYMMETRY</span>
        <span className="back-brand-sub">
          {lang === "en" ? "Architecture Studio" : "არქიტექტურული სტუდია"}
        </span>
        {title ? <h1 className="back-title">{title}</h1> : null}
      </div>
    </div>
  );
};

export default Back;
