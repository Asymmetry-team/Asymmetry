import React from "react";
import { footer } from "../../data/Data";
import "./footer.css";

const Footer = () => {
  return (
    <>
      <footer>
        <div className="container">
          <div className="box">
            <div className="logo">
              <img src="../images/logo-light.png" alt="Asymmetry — არქიტექტურული სტუდია" />
              <h2 style={{ marginBottom: "20px" }}>არ გამოტოვოთ სიახლეები</h2>
              <div className="input flex">
                <input type="text" placeholder="მეილის მისამართი" />
                <button style={{ marginInline: "10px" }}>გამოწერა</button>
              </div>
            </div>
          </div>

          {footer.map((val) => (
            <div className="box">
              <h3>{val.title}</h3>
              <ul
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                {val.text.map((item) => (
                  <>
                    {item.href ? (
                      <a href={item.href} style={{ color: "grey" }}>
                        {item.list}
                      </a>
                    ) : (
                      <li> {item.list} </li>
                    )}
                  </>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className="legal">
        <span>Copyright 2023 Asymmetry llc.</span>
      </div>
    </>
  );
};

export default Footer;
