import React from "react";
import { useLang } from "../../../i18n";

// partner logos in /public/images/partners/ (full filename so .svg and .png can
// mix). Any file that is not present yet is hidden (see onError) so a missing
// logo never shows as a broken image.
const partners = [
  "solaris.svg",
  "altabuild.svg",
  "domus.svg",
  "bude.svg",
  "ferrofence.svg",
  "stonecraft.svg",
  "tbilisi-energji.png",
  "gwp.png",
  "telasi.png",
];

// these real-company logos keep their own (blue) colour instead of the silver
// grayscale treatment used for the rest
const colorLogos = new Set(["gwp.png", "telasi.png"]);

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
              className={`partner-logo${
                colorLogos.has(p) ? " partner-logo--color" : ""
              }`}
              src={`/images/partners/${p}`}
              alt={p.replace(/\.(svg|png)$/, "")}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Partners;
