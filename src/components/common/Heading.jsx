import React from "react";

const Heading = ({ title, subtitle }) => {
  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </>
  );
};

export default Heading;
