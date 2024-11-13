import React from 'react';

interface HeroTitleProps {
  heading: JSX.Element | string;
  subheading: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
}

const HeroTitle: React.FC<HeroTitleProps> = ({ heading, subheading, variant = 'primary' }) => {
  const baseStylesHeader = 'text-7xl font-calsans leading-snug ';
  const variantStylesHeader = {
    primary: 'text-white',
    secondary: 'text-black',
    tertiary: 'text-black'
  };

  const baseStylesSubHeading = 'text-xl';
  const variantStylesSubHeading = {
    primary: 'text-textGray',
    secondary: 'text-black',
    tertiary: 'text-black max-w-lg'
  };

  const combinedStylesHeader = `${baseStylesHeader} ${variantStylesHeader[variant]}`;
  const combinedStylesSubHeading = `${baseStylesSubHeading} ${variantStylesSubHeading[variant]}`;
  
  return (
    <div >
      <h1 className={combinedStylesHeader}>{heading}</h1>
      <p className={combinedStylesSubHeading}>{subheading}</p>
    </div>
  );
};

export default HeroTitle;