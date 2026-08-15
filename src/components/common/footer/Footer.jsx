import React from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import { footer } from "../../data/Data";
import "./footer.css";

const iconMap = {
  Facebook: "mdi:facebook",
  Instagram: "mdi:instagram",
  TikTok: "ic:baseline-tiktok",
  YouTube: "mdi:youtube",
  "connectasymmetry@gmail.com": "mdi:gmail",
  "571 14 14 69": "mdi:phone",
};

const ItemInner = ({ item }) => {
  const icon = iconMap[item.list];
  return (
    <>
      {icon && (
        <span className="footer-item-icon">
          <Icon icon={icon} />
        </span>
      )}
      <span className="footer-item-text">{item.list}</span>
    </>
  );
};

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box logo-box">
            <img
              src="../images/logo-light.png"
              alt="Asymmetry — არქიტექტურული სტუდია"
            />
            <p>
              არქიტექტურული სტუდია - ასიმეტრია - სრული საპროექტო მომსახურება,
              არქიტექტურული პროექტი, პროექტირება და მშენებლობის ნებართვის
              მოპოვება.
            </p>
          </div>

          {footer.map((val, i) => (
            <div className="box" key={i}>
              <h3>{val.title}</h3>
              <ul className="footer-items">
                {val.text.map((item, j) => {
                  if (item.day) {
                    return (
                      <li className="footer-item footer-hours" key={j}>
                        <span>{item.day}</span>
                        <span>{item.time}</span>
                      </li>
                    );
                  }
                  return (
                    <li className="footer-item" key={j}>
                      {item.href ? (
                        item.href.startsWith("/") ? (
                          <Link to={item.href}>
                            <ItemInner item={item} />
                          </Link>
                        ) : (
                          <a
                            href={item.href}
                            {...(item.href.startsWith("http")
                              ? { target: "_blank", rel: "noreferrer" }
                              : {})}
                          >
                            <ItemInner item={item} />
                          </a>
                        )
                      ) : (
                        <ItemInner item={item} />
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </footer>

      <div className="legal">
        <div className="legal-brand">
          <img src="../images/logo-light.png" alt="Asymmetry" />
          <span>Copyright 2026 Asymmetry llc.</span>
        </div>
        <Link to="/privacy-policy">კონფიდენციალურობის პოლიტიკა</Link>
        <Link to="/return-policy">დაბრუნების პოლიტიკა</Link>
        <Link to="/terms">წესები და პირობები</Link>
      </div>
    </>
  );
};

export default Footer;
