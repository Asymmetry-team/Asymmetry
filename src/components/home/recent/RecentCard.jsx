import React, { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import ImageSlider from "./ImageSlider";
import { list } from "../../data/Data";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// mobile shows 4, desktop shows 6 until "show all" is clicked
const getLimit = () =>
  typeof window !== "undefined" && window.innerWidth <= 700 ? 4 : 6;

const RecentCard = ({ preview }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [showAll, setShowAll] = useState(false);
  // start at 6 (matches the pre-rendered desktop HTML) then adjust per device
  const [limit, setLimit] = useState(6);
  const frameRef = useRef(null);

  useEffect(() => {
    const onResize = () => setLimit(getLimit());
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  // Per-card fade-up reveal that REPLAYS every time a card scrolls into view:
  // entering the viewport adds `.in` (runs the cardRise animation), leaving it
  // removes `.in` so the next scroll-in animates again — like the hero numbers.
  // Per-card (not whole-grid) means a tall grid can never blank itself out.
  const shown = preview && !showAll ? list.slice(0, limit) : list;

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return;
    const cards = el.querySelectorAll(".reveal-card");
    if (typeof IntersectionObserver === "undefined") {
      cards.forEach((c) => c.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          // reveal once ~15% of the card is on screen; only reset after it has
          // scrolled FULLY out of view (ratio 0). This way a partially-visible
          // card at the viewport edge is never blanked — it stays shown and
          // just replays the next time it fully re-enters.
          if (e.intersectionRatio >= 0.15) {
            e.target.classList.add("in");
          } else if (e.intersectionRatio === 0) {
            e.target.classList.remove("in");
          }
        }),
      { threshold: [0, 0.15] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [shown.length]);

  const containerStyles = {
    width: "100%",
    // fixed 16:10 frame (not viewport-height based) so wide renders aren't
    // over-cropped into a square on taller screens — shows more of the photo
    aspectRatio: "16 / 10",
    margin: "0 auto",
    cursor: "zoom-in",
  };

  return (
    <>
      <div className="projects-frame" ref={frameRef}>
        <div className="content grid3 mtop">
          {shown.map((val, index) => {
            const { images, location, name, price, year } = val;
            const lightboxSlides = images.map((img) => ({ src: img }));
            return (
              <div className="box shadow reveal-card" key={index}>
                <div
                  style={containerStyles}
                  onClick={() => {
                    setSlides(lightboxSlides);
                    setLightboxOpen(true);
                  }}
                >
                  <ImageSlider slides={images} />
                </div>
                <div className="text">
                  <h4>{name}</h4>
                  <p>
                    <i className="fa fa-location-dot"></i> {location}
                  </p>
                </div>
                <div className="button flex">
                  <button className="btn2">{price}</button>
                  <button className="btn2 year-badge">
                    {year || "2026 წელი"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        controller={{
          closeOnBackdropClick: true,
        }}
        close={() => setLightboxOpen(false)}
        slides={slides}
        styles={{
          root: {
            zIndex: 100000,
          },
        }}
      />

      {preview && (
        <div className="projects-toggle-wrap">
          <button
            className="projects-toggle"
            onClick={() => setShowAll(!showAll)}
          >
            <span>{showAll ? "ნაკლების ნახვა" : "სრულად ჩვენება"}</span>
            <Icon icon={showAll ? "mdi:chevron-up" : "mdi:chevron-down"} />
          </button>
        </div>
      )}
    </>
  );
};

export default RecentCard;
