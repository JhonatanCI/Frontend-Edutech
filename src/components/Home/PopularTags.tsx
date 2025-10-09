import React from "react";

import { useNavigate } from "react-router-dom";

interface PopularTagsProps {
  tags: string[];
}

const PopularTags: React.FC<PopularTagsProps> = ({ tags }) => {
  const navigate = useNavigate();

  const handleTagClick = (tag: string) => {
    navigate(`/search?q=${encodeURIComponent(tag)}&page=0`);
  };

  return (
    <div className="mt-8">
      <h3 className="text-sm font-medium mb-3">Búsquedas populares</h3>
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => (
          <button
            key={index}
            onClick={() => handleTagClick(tag)}
            className="bg-gray-200 text-gray-500 font-medium text-xs font-inter px-6 py-2 rounded-none hover:bg-gray-300 transition-colors duration-200"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PopularTags;
