import React from "react";
import { Link } from "react-router-dom";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img
                src="../images/logo-light.png"
                alt="Asymmetry — არქიტექტურული სტუდია"
              />
            </div>
          </div>

          {footer.map((val, i) => (
            <div className="box" key={i}>
              <h3>{val.title}</h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {val.text.map((item, j) => (
                  <React.Fragment key={j}>
                    {item.href ? (
                      <a
                        href={item.href}
                        style={{ color: "grey" }}
                        {...(item.href.startsWith("http")
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                      >
                        {item.list}
                      </a>
                    ) : (
                      <li> {item.list} </li>
                    )}
                  </React.Fragment>
                ))}
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
