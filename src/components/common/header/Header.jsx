import React, { useState } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";

const socialIcons = [
  {
    href: "https://www.facebook.com/profile.php?id=100092504264433",
    icon: "ri:facebook-circle-line",
  },
  {
    href: "https://www.instagram.com/studio.asymmetry/",
    icon: "ri:instagram-line",
  },
  {
    href: "https://www.tiktok.com/@studio_asymmetry",
    icon: "ri:tiktok-fill",
  },
];

const Header = () => {
  const [navList, setNavList] = useState(false);

  return (
    <header>
      <Link to="/" className="logo-wrapper">
        <img
          src="./images/logo.png"
          alt="Asymmetry — არქიტექტურული სტუდია"
          style={{ width: "100%", height: "100%" }}
        />
      </Link>
      <div className="nav" id="main-nav-horizontal">
        <ul className={navList ? "small" : "flex"}>
          {nav.map((list, index) => (
            <li key={index} onClick={() => setNavList(false)}>
              <Link to={list.path}>{list.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="icons-wrapper">
        {socialIcons.map((icon) => (
          <a href={icon.href} target="_blank" rel="noreferrer">
            {/* <i className={icon.icon} style={{ fontSize: "20px" }} /> */}
            <Icon
              icon={icon.icon}
              style={{ fontSize: "35px", color: "#302B88" }}
            />
          </a>
        ))}
      </div>
      <div className="toggle">
        <button onClick={() => setNavList(!navList)}>
          {navList ? (
            <i className="fa fa-times"></i>
          ) : (
            <i className="fa fa-bars"></i>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
