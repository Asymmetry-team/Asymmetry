import React from "react";
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css";

const Team = () => {
  return (
    <>
      <section className="team background">
        <div className="container">
          <Heading title="ჩვენი გუნდი" subtitle="" />
          <div className="content mtop grid3">
            {team.map((val) => (
              <div className="team-wrapper">
                <div className="img">
                  <img src={val.cover} alt={`${val.address} — ${val.name}, Asymmetry`} />
                </div>
                <h3>{val.address}</h3>
                <h4 style={{ fontWeight: 400 }}>{val.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
