import React from 'react';

interface HeroTitleProps {
    heading: JSX.Element | string;
    subheading: string;
  }

const HeroTitle: React.FC<HeroTitleProps> = ({ heading, subheading }) => {
    return (
      <div >
        <h1 className="text-white text-7xl font-calsans leading-snug ">{heading}</h1>
        <p className="text-textGray mt-4 text-xl">{subheading}</p>
      </div>
    );
  };
  
export default HeroTitle;