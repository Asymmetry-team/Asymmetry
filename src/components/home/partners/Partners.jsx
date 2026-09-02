import React from "react";
import { useLang } from "../../../i18n";

// partner logos (SVGs in /public/images/partners/) — construction partners
// across solar, high-rise, private houses, wooden cottages, fencing & masonry
const partners = [
  "solaris",
  "altabuild",
  "domus",
  "woodnest",
  "ferrofence",
  "stonecraft",
];

// The auto-rotating partners marquee. Rendered inside the Featured section on
// desktop, and again as a standalone block at the very bottom of the home page
// on mobile (only one is visible per breakpoint — see Featured.css).
// `reveal` is off for the standalone copy: it lives outside the sections whose
// IntersectionObserver adds `.in`, so it must stay visible on its own.
const Partners = ({ variant = "featured", reveal = true }) => {
  const { t } = useLang();
  return (
    <div
      className={`bubble partners-bubble partners-${variant}${
        reveal ? " reveal-card" : ""
      }`}
    >
      <div className="bubble-head partners-head">
        <span className="bubble-title grad-head grad-head-2">
          {t("home.partners")}
        </span>
      </div>
      <div className="partners-viewport">
        <div className="partners-marquee">
          {[...partners, ...partners].map((p, i) => (
            <img
              key={i}
              className="partner-logo"
              src={`/images/partners/${p}.svg`}
              alt={p}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
