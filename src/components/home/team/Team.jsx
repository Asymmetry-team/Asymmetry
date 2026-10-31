import React from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import { useLang } from "../../../i18n";
import "./team.css";

// founder: optional bio inside the first card: plain text on phones, a popup on
// hovering the card with a mouse (about.css).
const Team = ({ founder }) => {
  const { tr } = useLang();
  return (
    <>
      <section className={`team background${founder ? " team--founder" : ""}`}>
        <div className="container">
          <div className="panel-frame">
            <Heading title={tr("ჩვენი გუნდი")} subtitle="" accent hue="grad-head-3" />
            <div className="content grid3">
              {team.map((val, index) => (
                <div className="team-wrapper" key={index}>
                  <div className="img">
                    <img
                      src={val.cover}
                      alt={`${tr(val.address)} — ${tr(val.name)}, Asymmetry`}
                    />
                  </div>
                  <h3>{tr(val.address)}</h3>
                  <h4 style={{ fontWeight: 400 }}>{tr(val.name)}</h4>
                  {index === 0 && founder}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
