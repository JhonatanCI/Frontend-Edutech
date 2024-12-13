import React from 'react';

interface HabilitiesTagsProps {
  tags: string[];
}

const HabilitiesTags: React.FC<HabilitiesTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-col mt-2">
      <p className="text-white text-sm font-light font-inter">
        Habilidades que desarrollarás
      </p>
      <div className="flex justify-left mt-3 gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            className="bg-gray-200 text-gray-500 font-medium text-xs font-inter px-6 py-2 rounded-2xl hover:bg-gray-300"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>

  );
};

export default HabilitiesTags;