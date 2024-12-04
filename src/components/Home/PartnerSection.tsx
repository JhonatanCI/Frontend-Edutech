import React from "react";
import HeroTitle from "./HeroTitle";
import Marquee from "react-fast-marquee";

import { partners } from "../../consts/partners.d";

const PartnerSection: React.FC = () => {
  return (
    <div id="organizaciones" className="flex flex-col items-center pt-28 pb-28 bg-white">
      <HeroTitle heading={"Conoce nuestros aliados"} subheading="" variant="secondary" />
      <div className="bg-white py-10 w-full">
        <Marquee gradient={false} speed={50} pauseOnHover={true}>
          {partners.map((partner, index) => (
            <div key={index} className="mx-10">
              <img
                src={partner.src}
                alt={partner.alt}
                className="h-20 opacity-80 hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default PartnerSection;
