import React from 'react';

interface HeroTitleProps {
  heading: JSX.Element | string;
  subheading: string;
  variant?: 'primary' | 'secondary';
}

const HeroTitle: React.FC<HeroTitleProps> = ({ heading, subheading, variant = 'primary' }) => {
  const baseStylesHeader = 'text-7xl font-calsans leading-snug ';
  const variantStylesHeader = {
    primary: 'text-white',
    secondary: 'text-black',
  };

  const baseStylesSubHeading = 'text-xl';
  const variantStylesSubHeading = {
    primary: 'text-textGray',
    secondary: 'text-black',
  };

  const combinedStylesHeader = `${baseStylesHeader} ${variantStylesHeader[variant]}`;
  const combinedStylesSubHeading = `${baseStylesSubHeading} ${variantStylesSubHeading[variant]} bg-red`;
  
  return (
    <div >
      <h1 className={combinedStylesHeader}>{heading}</h1>
      <p className={combinedStylesSubHeading}>{subheading}</p>
    </div>
  );
};

export default HeroTitle;