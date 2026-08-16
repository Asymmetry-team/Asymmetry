import React from "react";

// Premium typographic sub-page banner: brand wordmark (elegant serif) over a
// deep brand-gradient, with the page title underneath. No photo needed.
const Back = ({ title }) => {
  return (
    <div className="back">
      <div className="back-inner">
        <span className="back-brand">ASYMMETRY</span>
        <span className="back-brand-sub">არქიტექტურული სტუდია</span>
        {title ? <h1 className="back-title">{title}</h1> : null}
      </div>
    </div>
  );
};

export default Back;
