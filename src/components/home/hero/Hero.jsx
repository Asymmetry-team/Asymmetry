import React, { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import CountUp from "./CountUp";
import "./hero.css";

const stats = [
  {
    icon: "mdi:floor-plan",
    end: 1000,
    decimals: 0,
    suffix: "+",
    separator: true,
    label: "პროექტი",
  },
  {
    icon: "mdi:account-group",
    end: 100000,
    decimals: 0,
    suffix: "+",
    separator: true,
    label: "გამომწერი",
  },
  {
    icon: "mdi:google",
    end: 5,
    decimals: 1,
    suffix: "",
    separator: false,
    label: "Google შეფასება",
  },
];

const Hero = () => {
  const textRef = useRef(null);

  // replay the title's fade-up every time the hero scrolls back into view
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    if (typeof navigator !== "undefined" && navigator.userAgent === "ReactSnap")
      return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.remove("animate");
            void el.offsetWidth; // force reflow so the animation restarts
            el.classList.add("animate");
          }
        }),
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div id="hero-text" ref={textRef}>
            <h1>შენი 3D მოთხოვნების დასაკმაყოფილებლად</h1>
          </div>

          <div className="hero-stats">
            {stats.map((s, i) => (
              <div className="hero-stat" key={i}>
                <span className="hero-stat-icon">
                  <Icon icon={s.icon} />
                </span>
                <CountUp
                  className="hero-stat-num"
                  end={s.end}
                  decimals={s.decimals}
                  suffix={s.suffix}
                  separator={s.separator}
                />
                <span className="hero-stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="backdrop" />
      </section>
    </>
  );
};

export default Hero;
