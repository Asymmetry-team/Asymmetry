import React, { useEffect, useRef, useState } from "react";

const Heading = ({ title, subtitle, pill, gradient, accent }) => {
  const cls = pill
    ? "heading-pill"
    : gradient
    ? "heading-gradient-text"
    : accent
    ? "heading-accent"
    : "";

  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setInView(true)),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`heading-reveal ${inView ? "in" : ""}`}
      style={{ textAlign: "center" }}
    >
      <h2 className={cls}>{title}</h2>
      {subtitle ? <p>{subtitle}</p> : null}
    </div>
  );
};

export default Heading;
