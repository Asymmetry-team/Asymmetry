import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./backToTop.css";

// "Scroll to top" bubble, bottom-CENTRE (between "ფასის გამოთვლა" and
// "მოგვწერეთ"). Like studiolingo.ge, a circular progress ring fills up as you
// scroll down the page; clicking scrolls smoothly back to the top.
const R = 23;
const C = 2 * Math.PI * R;

const BackToTop = () => {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const scrollable = document.body.scrollHeight - window.innerHeight;
      const p = scrollable > 0 ? Math.min(1, scrolled / scrollable) : 0;
      setProgress(p);
      // appear once you've scrolled a little, so the ring filling is visible
      setShow(scrollable > 0 && scrolled > window.innerHeight * 0.4);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <button
      className={`back-to-top ${show ? "is-visible" : ""}`}
      onClick={toTop}
      aria-label="ზემოთ დაბრუნება"
    >
      <svg className="btt-ring" viewBox="0 0 52 52" aria-hidden="true">
        <defs>
          <linearGradient id="bttGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3a5cd8" />
            <stop offset="100%" stopColor="#6a4ad0" />
          </linearGradient>
        </defs>
        <circle className="btt-ring-track" cx="26" cy="26" r={R} />
        <circle
          className="btt-ring-progress"
          cx="26"
          cy="26"
          r={R}
          style={{
            strokeDasharray: C,
            strokeDashoffset: C * (1 - progress),
          }}
        />
      </svg>
      <Icon icon="mdi:chevron-up" className="back-to-top-icon" />
    </button>
  );
};

export default BackToTop;
