import React, { useState, useEffect } from "react";
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
  const [limit, setLimit] = useState(getLimit());

  useEffect(() => {
    const onResize = () => setLimit(getLimit());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const containerStyles = {
    width: "100%",
    height: "30vh",
    margin: "0 auto",
    cursor: "zoom-in",
  };

  const shown = preview && !showAll ? list.slice(0, limit) : list;

  return (
    <>
      <div className="projects-frame">
        <div className="content grid3 mtop">
          {shown.map((val, index) => {
            const { images, location, name, price } = val;
            const lightboxSlides = images.map((img) => ({ src: img }));
            return (
              <div className="box shadow" key={index}>
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
                  <button className="btn2 year-badge">2026 წელი</button>
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
