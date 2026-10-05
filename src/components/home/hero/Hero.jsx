import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import CountUp from "./CountUp";
import "./hero.css";
import { useLang } from "../../../i18n"

const stats = [
  {
    icon: "mdi:floor-plan",
    end: 1000,
    decimals: 0,
    suffix: "+",
    separator: true,
    label: "პროექტი",
    en: "projects",
  },
  {
    icon: "mdi:account-group",
    end: 100000,
    decimals: 0,
    suffix: "+",
    separator: true,
    label: "გამომწერი",
    en: "followers",
  },
  {
    icon: "mdi:google",
    end: 5,
    decimals: 1,
    suffix: "",
    separator: false,
    label: "Google შეფასება",
    en: "Google rating",
  },
];

const Hero = () => {
  const { lang } = useLang()
  const [atTop, setAtTop] = useState(true);

  // Same behaviour as the header tagline: the title fades out as you scroll
  // down and fades back in when you return to the top (identical timing).
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <div id="hero-text" className={atTop ? "" : "is-hidden"}>
            {lang === "en" ? (
              <h1>
                Designed around
                <br />
                your 3D vision
              </h1>
            ) : (
              <h1>
                შენი 3D მოთხოვნების
                <br />
                დასაკმაყოფილებლად
              </h1>
            )}
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
                  duration={3000}
                />
                <span className="hero-stat-label">{lang === "en" ? s.en : s.label}</span>
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
