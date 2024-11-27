import React, { useState, useEffect } from "react";
import learningItems from "../consts/learningItems.d";

const TalentCycleComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const cycleDuration = 15000; // 15 seconds
  const [isPaused, setIsPaused] = useState(false);

  // Automatically cycle through the items
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === learningItems.length - 1 ? 0 : prevIndex + 1
      );
    }, cycleDuration);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handleSwitch = (index: number) => {
    setCurrentIndex(index);
    setIsPaused(true);
    setTimeout(() => setIsPaused(false), cycleDuration); // Resume cycling
  };

  return (
    <div className="relative h-1/2 w-1/3 bg-white shadow-md rounded-lg p-4  mx-auto ">
      <div className="space-y-4">
        {learningItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleSwitch(index)}
            className={`relative flex flex-col items-start p-4 rounded-md cursor-pointer transition-all ${
              index === currentIndex
                ? "bg-green-50 text-green-700 shadow-lg scale-105"
                : "text-textGray bg-white"
            }`}
          >
            <div className="flex items-center">
              <span className="mr-3 text-lg">{item.icon}</span>
              <h4
                className={`font-semibold ${
                  index === currentIndex ? "text-green-700" : ""
                }`}
              >
                {item.title}
              </h4>
            </div>
            {/* Show Description for Active Item Only */}
            {index === currentIndex && (
              <>
                <p
                  className={`text-sm mt-2 transition-opacity duration-500 ${
                    index === currentIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {item.description}
                </p>
                {/* Progress Bar for Active Item */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 mt-2 rounded-full overflow-hidden">
                  <div
                    className="absolute top-0 left-0 h-full bg-green-500"
                    style={{
                      width: "100%",
                      animation: `progressBar ${cycleDuration}ms linear`,
                    }}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Animation Styles */}
      <style>
        {`
          @keyframes progressBar {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default TalentCycleComponent;
