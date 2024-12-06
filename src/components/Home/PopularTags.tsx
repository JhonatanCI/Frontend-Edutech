import React from 'react';

interface PopularTagsProps {
  tags: string[];
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags }) => {
  return (
    <div className="flex flex-col mt-4 ">
      <h2 className="text-gray font-normal font-inter">
        Búsquedas populares
      </h2>
      <div className="flex justify-left mt-4 space-x-4">
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

export default PopularTags;