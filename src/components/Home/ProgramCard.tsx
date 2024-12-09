import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CardProps {
  image: string;
  title: string;
  description: string;
  buttonText: string;
  path?: string;
}

const ProgramCard: React.FC<CardProps> = ({ image, title, description, buttonText, path }) => {
  
  const navigateTo = useNavigate()

  const handleClick = () => {
      path && navigateTo(path)
  }
  
  return (
    <div className="w-96 bg-white border border-textGray text-black rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
      {/* Card Image */}
      <div className=' px-6 pt-4 flex justify-center'>
        <img src={image} alt={title} className="w-full h-48 object-cover border border-textGray" />
      </div>
      
      
      {/* Card Body */}
      <div className="p-6 text-left">
        <h3 className="text-3xl font-calsans text-black mb-3">{title}</h3>
        <p className="text-black mb-6">{description}</p>
        <button className="bg-white flex items-center text-black font-semibold hover:underline" onClick={handleClick}>
          {buttonText}
          <span className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;