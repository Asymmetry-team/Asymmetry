import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "./footer.css";

const contact = [
  { icon: "mdi:phone", text: "+995 571 14 14 69", href: "tel:+995571141469" },
  {
    icon: "mdi:email-outline",
    text: "connectasymmetry@gmail.com",
    href: "mailto:connectasymmetry@gmail.com",
  },
  {
    icon: "mdi:map-marker-outline",
    text: "წერეთლის 116, თბილისი",
    href: "https://maps.app.goo.gl/wxHeiGVkGx4v8XQk8",
    blank: true,
  },
];

const socials = [
  {
    icon: "mdi:facebook",
    href: "https://www.facebook.com/profile.php?id=100092504264433",
    label: "Facebook",
  },
  {
    icon: "mdi:instagram",
    href: "https://www.instagram.com/studio.asymmetry/",
    label: "Instagram",
  },
  {
    icon: "mdi:youtube",
    href: "https://www.youtube.com/@connect.asymmetry/featured",
    label: "YouTube",
  },
  {
    icon: "ic:baseline-tiktok",
    href: "https://www.tiktok.com/@studio_asymmetry",
    label: "TikTok",
  },
];

const links = [
  { text: "კონფიდენციალურობის პოლიტიკა", to: "/privacy-policy" },
  { text: "დაბრუნების პოლიტიკა", to: "/return-policy" },
  { text: "წესები და პირობები", to: "/terms" },
];

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <img
            src="../images/logo-light.png"
            alt="Asymmetry — არქიტექტურული სტუდია"
            className="footer-logo"
          />
          <p>
            არქიტექტურული სტუდია — ასიმეტრია. სრული საპროექტო მომსახურება:
            არქიტექტურული პროექტი, პროექტირება და მშენებლობის ნებართვის მოპოვება.
          </p>
        </div>

        <div className="footer-col">
          <h3>კონტაქტი</h3>
          <ul className="footer-contact">
            {contact.map((c, i) => (
              <li key={i}>
                <span className="footer-contact-icon">
                  <Icon icon={c.icon} />
                </span>
                {c.href ? (
                  <a
                    href={c.href}
                    {...(c.blank
                      ? { target: "_blank", rel: "noreferrer" }
                      : {})}
                  >
                    {c.text}
                  </a>
                ) : (
                  <span>{c.text}</span>
                )}
              </li>
            ))}
          </ul>

          <div className="footer-socials">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="footer-social"
              >
                <Icon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-col">
          <h3>ბმულები</h3>
          <ul className="footer-links">
            {links.map((l, i) => (
              <li key={i}>
                <Link to={l.to}>{l.text}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 Asymmetry — ყველა უფლება დაცული</span>
      </div>
    </footer>
  );
};

export default Footer;
