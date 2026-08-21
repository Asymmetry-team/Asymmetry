import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ImageSlider from "./ImageSlider";
import { list } from "../../data/Data";
import { useLang } from "../../../i18n";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const RecentCard = ({ preview }) => {
  const { tr } = useLang();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const frameRef = useRef(null);
  const trackRef = useRef(null);

  // Home = swipeable carousel (a 3×2 grid of 6 per page, paging through them
  // all); /projects = the full static grid (unchanged).
  const shown = list;

  // A "page" is exactly the visible width (3 columns × 2 rows = 6 cards).
  const scroll = (dir) => {
    const el = trackRef.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth, behavior: "smooth" });
  };

  // Hide the left arrow on the first page and the right arrow on the last one.
  const updateArrows = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 8);
    setAtEnd(el.scrollLeft >= el.scrollWidth - el.clientWidth - 8);
  };

  useEffect(() => {
    if (!preview) return;
    const el = trackRef.current;
    if (!el) return;
    let t;
    const onScroll = () => {
      updateArrows();
      // re-check once scrolling settles (scroll-snap can fire a transient
      // mid-scroll value that would otherwise stick)
      clearTimeout(t);
      t = setTimeout(updateArrows, 120);
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateArrows);
    const initT = setTimeout(updateArrows, 300); // settle after first paint
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateArrows);
      clearTimeout(t);
      clearTimeout(initT);
    };
  }, [preview]);

  // Per-card fade-up reveal that replays each time a card scrolls into view.
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
          if (e.intersectionRatio >= 0.15) e.target.classList.add("in");
          else if (e.intersectionRatio === 0) e.target.classList.remove("in");
        }),
      { threshold: [0, 0.15] }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, [shown.length]);

  const containerStyles = {
    width: "100%",
    aspectRatio: "16 / 10",
    margin: "0 auto",
    cursor: "zoom-in",
  };

  const renderCard = (val, index, extraClass) => {
    const { id, images, location, name, price, year } = val;
    const lightboxSlides = images.map((img) => ({ src: img }));
    return (
      <div className={`box shadow reveal-card ${extraClass}`} key={index}>
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
          <h4>
            <Link to={`/projects/${id}`} className="project-name-link">
              {tr(name)}
            </Link>
          </h4>
          <p>
            <i className="fa fa-location-dot"></i> {tr(location)}
          </p>
        </div>
        <div className="button flex">
          <button className="btn2">{price}</button>
          <button className="btn2 year-badge">{tr(year || "2026 წელი")}</button>
        </div>
        <Link to={`/projects/${id}`} className="detail-link">
          {tr("დეტალურად ნახვა →")}
        </Link>
      </div>
    );
  };

  return (
    <>
      {preview ? (
        <div className="projects-carousel-frame" ref={frameRef}>
          <button
            className={`carousel-arrow carousel-arrow--left ${
              atStart ? "carousel-arrow--off" : ""
            }`}
            onClick={() => scroll(-1)}
            aria-label="წინა"
          >
            <Icon icon="mdi:chevron-left" />
          </button>

          <div className="projects-carousel-track" ref={trackRef}>
            {shown.map((val, i) => renderCard(val, i, "projects-carousel-card"))}
          </div>

          <button
            className={`carousel-arrow carousel-arrow--right ${
              atEnd ? "carousel-arrow--off" : ""
            }`}
            onClick={() => scroll(1)}
            aria-label="შემდეგი"
          >
            <Icon icon="mdi:chevron-right" />
          </button>
        </div>
      ) : (
        <div className="projects-frame" ref={frameRef}>
          <div className="content grid3 mtop">
            {shown.map((val, i) => renderCard(val, i, ""))}
          </div>
        </div>
      )}

      <Lightbox
        open={lightboxOpen}
        controller={{ closeOnBackdropClick: true }}
        close={() => setLightboxOpen(false)}
        on={{ click: () => setLightboxOpen(false) }}
        slides={slides}
        styles={{ root: { zIndex: 100000 } }}
      />
    </>
  );
};

export default RecentCard;
