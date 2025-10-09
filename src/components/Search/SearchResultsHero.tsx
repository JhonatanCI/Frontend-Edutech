import React, { useState } from "react";
import { SearchResultsHeroProps } from "../../types/search.types";
import icesiImage from "../../assets/Icesi.jpg";

const SearchResultsHero: React.FC<SearchResultsHeroProps> = ({
  searchTerm,
  totalResults,
  onSearch,
}) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  const handleSearch = (searchValue: string) => {
    if (searchValue.trim()) {
      onSearch(searchValue.trim());
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch(inputValue);
    }
  };

  return (
    <div
      className="relative text-white py-8 overflow-hidden z-0"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${icesiImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Resultados de búsqueda
            </h1>
            <p className="text-lg text-gray-300">
              {totalResults > 0 ? (
                <>
                  Encontramos{" "}
                  <span className="text-primaryBlue font-semibold">
                    {totalResults}
                  </span>{" "}
                  resultados para "
                  <span className="text-primaryBlue font-semibold">
                    {searchTerm}
                  </span>
                  "
                </>
              ) : (
                `No se encontraron resultados para "${searchTerm}"`
              )}
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="flex">
              <input
                type="text"
                placeholder="Buscar cursos o programas"
                className="bg-white font-inter text-sm text-textGray px-4 py-3 w-full rounded-l-sm border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primaryBlue flex-grow"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
              <button
                onClick={() => handleSearch(inputValue)}
                className="bg-primaryBlue text-white px-6 py-3 rounded-r-sm hover:bg-primaryBlue-dark transition-colors duration-200"
              >
                <svg
                  width="23"
                  height="23"
                  viewBox="0 0 27 27"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3.20363 18.6974C-1.06792 14.4258 -1.06783 7.47533 3.20363 3.20371C7.47528 -1.0679 14.4257 -1.0679 18.6973 3.20371C22.3212 6.82759 22.87 12.2172 20.3453 16.426C20.3453 16.426 20.1639 16.7302 20.4089 16.975C21.8062 18.3722 25.9984 22.5645 25.9984 22.5645C27.111 23.6769 27.3758 25.2326 26.3892 26.2193L26.2193 26.389C25.2327 27.3758 23.677 27.111 22.5645 25.9985C22.5645 25.9985 18.3812 21.8151 16.9867 20.4207C16.7301 20.164 16.4259 20.3454 16.4259 20.3454C12.2172 22.87 6.82754 22.3213 3.20363 18.6974ZM16.6747 16.6747C19.831 13.5184 19.8309 8.38286 16.6746 5.22658C13.5183 2.07038 8.38265 2.07029 5.22643 5.22658C2.07012 8.38277 2.07012 13.5184 5.22643 16.6747C8.38273 19.8308 13.5183 19.8308 16.6747 16.6747Z"
                    fill="white"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsHero;
