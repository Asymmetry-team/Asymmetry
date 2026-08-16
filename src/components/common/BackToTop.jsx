import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./backToTop.css";

// Small "scroll to top" bubble that appears at the bottom-left once you've
// scrolled near the bottom of the page. Click → smooth animated scroll up.
const BackToTop = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const nearBottom =
        window.innerHeight + scrolled >= document.body.scrollHeight - 350;
      setShow(scrolled > 300 && nearBottom);
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
      <Icon icon="mdi:chevron-up" className="back-to-top-icon" />
    </button>
  );
};

export default BackToTop;
