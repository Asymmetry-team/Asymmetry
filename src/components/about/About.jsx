import React from "react";
import Seo from "../common/Seo";
import Back from "../common/Back";
import Heading from "../common/Heading";
import img from "../images/about.jpg";
import Team from "../home/team/Team.jsx";
import "./about.css";

const About = () => {
  return (
    <>
      <Seo
        title="ჩვენ შესახებ — Asymmetry არქიტექტურული სტუდია"
        description="ასიმეტრია აერთიანებს საპროექტო სფეროსთვის საჭირო ყველა სპეციალობის გუნდს: მიწის ნაკვეთის ანალიზი, პროექტირება, შეთანხმება შესაბამის ორგანოებთან და მშენებლობის ზედამხედველობა."
        path="/about"
      />
      <section className="about">
        <Back name="" title="ჩვენ შესახებ" cover={img} />
        <div className="container mtop">
          <Heading title="ვინ ვართ ჩვენ?" subtitle="" accent />
          <div className="panel-frame">
            <div className="flex about-inner">
              <div className="left row">
                <p>
              არქიტექტურული სტუდია „ასიმეტრია“ აერთიანებს ახალგაზრდა, კრეატიულ
              და მრავალპროფილურ გუნდს.
            </p>

            <p>
              ჩვენი საქმიანობა მოიცავს სრული საპროექტო მომსახურებისთვის საჭირო
              ყველა სერვისს, რომელიც აერთიანებს პროექტირებისათვის ყველა აუცილებელ
              ეტაპს, როგორიცაა: მიწის ნაკვეთის ანალიზი, პროექტირება, პროექტის
              შეთანხმება, მშენებლობის ნებართვის აღება, მომზადებული პროექტის
              შესაბამის ორგანოებთან შეთანხმება და სრული არქიტექტურული პროექტის
              მომსახურება.
            </p>

            <p>
              ჩვენი ოფისი მდებარეობს თბილისში, წერეთლის გამზირის №116-ში.
              მომსახურებას გთავაზობთ როგორც ოფისში, ისე ონლაინ და ადგილზე
              ვიზიტით. სამუშაოს ხარისხიანად შესრულებას ხელშეკრულებით
              ვუზრუნველყოფთ.
            </p>
          </div>
              <div className="right row">
                <img
                  src="/immio.jpg"
                  alt="Asymmetry — არქიტექტურული სტუდიის გუნდი და პროექტირება"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <Team />
    </>
  );
};
export default About;
