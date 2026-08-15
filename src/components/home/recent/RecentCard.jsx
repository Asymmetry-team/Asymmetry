import React, { useState } from "react";
import ImageSlider from "./ImageSlider";
import { list } from "../../data/Data";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const RecentCard = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [slides, setSlides] = useState([]);
  console.log(slides);

  const containerStyles = {
    width: "100%",
    height: "30vh",
    margin: "0 auto",
    cursor: "zoom-in",
  };
  return (
    <>
      <div className="content grid3 mtop">
        {list.map((val, index) => {
          const { images, location, name, price, type } = val;
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
                <div>
                  <button className="btn2">{price}</button>{" "}
                  <label htmlFor=""></label>
                </div>
                <span>{type}</span>
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
    </>
  );
};

export default RecentCard;
