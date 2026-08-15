import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

// Home-page sections that the nav scroll-spy tracks
const sectionMap = [
  { path: "/services", id: "home-services" },
  { path: "/projects", id: "home-projects" },
];

const socialIcons = [
  {
    href: "https://www.facebook.com/profile.php?id=100092504264433",
    icon: "mdi:facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/studio.asymmetry/",
    icon: "mdi:instagram",
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@studio_asymmetry",
    icon: "ic:baseline-tiktok",
    label: "TikTok",
  },
  {
    href: "https://www.youtube.com/@connect.asymmetry/featured",
    icon: "mdi:youtube",
    label: "YouTube",
  },
];

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [viewingPath, setViewingPath] = useState(null);
  const location = useLocation();

  // Scroll-spy: on the home page, highlight the nav item for the section
  // currently in view (the "მთავარი" page stays active on top of this).
  useEffect(() => {
    if (location.pathname !== "/") {
      setViewingPath(null);
      return;
    }
    const onScroll = () => {
      const line = window.innerHeight * 0.35;
      let current = null;
      for (const s of sectionMap) {
        const el = document.getElementById(s.id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) current = s.path;
      }
      setViewingPath(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [location.pathname]);

  return (
    <header>
      <a href="/" className="logo-wrapper">
        <img
          src="./images/logo.png"
          alt="Asymmetry — არქიტექტურული სტუდია"
          style={{ width: "100%", height: "100%" }}
        />
      </a>
      <div className="nav" id="main-nav-horizontal">
        <ul className={navList ? "small" : "flex"}>
          {nav.map((list, index) => (
            <li key={index} onClick={() => setNavList(false)}>
              <NavLink
                exact
                to={list.path}
                activeClassName="nav-active"
                className={list.path === viewingPath ? "nav-viewing" : ""}
              >
                {list.text}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
      <div className="icons-wrapper">
        {socialIcons.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            aria-label={s.label}
            className="social-chip"
          >
            <Icon icon={s.icon} />
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
