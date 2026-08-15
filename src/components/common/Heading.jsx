import React from "react";

const Heading = ({ title, subtitle, pill, gradient, accent }) => {
  const cls = pill
    ? "heading-pill"
    : gradient
    ? "heading-gradient-text"
    : accent
    ? "heading-accent"
    : "";
  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h2 className={cls}>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </>
  );
};

export default Heading;
