import React from "react";
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
  return (
    <>
      <section className="hero">
        <div className="container">
          <div id="hero-text">
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
