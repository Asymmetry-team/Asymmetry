import React, { useState } from "react";
import ImageSlider from "./ImageSlider";
import { list } from "../../data/Data";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const RecentCard = ({ preview }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const containerStyles = {
    width: "100%",
    height: "30vh",
    margin: "0 auto",
    cursor: "zoom-in",
  };

  // on the home page show only the first 4 until "show all" is clicked
  const shown = preview && !showAll ? list.slice(0, 4) : list;

  return (
    <>
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
      </div>

      {preview && (
        <div className="projects-toggle-wrap">
          <button
            className="projects-toggle"
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? "ნაკლების ნახვა" : "სრულად ჩვენება"}
          </button>
        </div>
      )}
    </>
  );
};

export default RecentCard;
