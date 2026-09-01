import React, { useState, useEffect } from "react";
import "./header.css";
import { nav } from "../../data/Data";
import { NavLink, useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";
import ThemeToggle from "../ThemeToggle";
import LanguageToggle from "../LanguageToggle";
import { useLang } from "../../../i18n";

// Home-page sections that the nav scroll-spy tracks
const sectionMap = [
  { path: "/services", id: "home-services" },
  { path: "/blog", id: "home-blog" },
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
  {
    href: "https://wa.me/995571141469",
    icon: "mdi:whatsapp",
    label: "WhatsApp",
  },
];

const Header = () => {
  const { t } = useLang();
  const [navList, setNavList] = useState(false);
  const [viewingPath, setViewingPath] = useState(null);
  const [atTop, setAtTop] = useState(true);
  const location = useLocation();

  // Top-bar tagline shows only near the very top of the page; it fades out as
  // you scroll down and fades back in when you return to the top.
  useEffect(() => {
    const onScroll = () => setAtTop(window.scrollY < 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
    <header className="site-header">
      <div className="header-top">
        <a href="/" className="logo-wrapper" aria-label="ASYMMETRY">
          <img
            className="logo-mark"
            src="/images/logo.png"
            alt="Asymmetry — არქიტექტურული სტუდია"
          />
          <span className="logo-word" aria-hidden="true">
            {"SYMMETRY".split("").map((ch, i) => (
              <span
                key={i}
                className="logo-letter"
                style={{ animationDelay: `${0.2 + i * 0.045}s` }}
              >
                {ch}
              </span>
            ))}
          </span>
        </a>

        <span className={`header-tagline ${atTop ? "" : "is-hidden"}`}>
          {t("header.tagline")} <span className="tagline-accent">{t("header.brand")}</span>
        </span>

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
          <ThemeToggle />
          <LanguageToggle />
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
      </div>

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
                {t(`nav${list.path}`, list.text)}
              </NavLink>
            </li>
          ))}

          {/* social icons live inside the dropdown on mobile (hidden on desktop) */}
          <li className="nav-socials">
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
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
