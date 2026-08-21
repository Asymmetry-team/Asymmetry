import React from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import { useLang } from "../../../i18n";
import "./team.css";

const Team = () => {
  const { tr } = useLang();
  return (
    <>
      <section className="team background">
        <div className="container">
          <div className="panel-frame">
            <Heading title={tr("ჩვენი გუნდი")} subtitle="" accent />
            <div className="content grid3">
              {team.map((val, index) => (
                <div className="team-wrapper" key={index}>
                  <div className="img">
                    <img
                      src={val.cover}
                      alt={`${val.address} — ${val.name}, Asymmetry`}
                    />
                  </div>
                  <h3>{val.address}</h3>
                  <h4 style={{ fontWeight: 400 }}>{tr(val.name)}</h4>
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
