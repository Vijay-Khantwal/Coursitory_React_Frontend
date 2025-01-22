import React, { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false); // Hide the indicator after 3 seconds
    }, 3000);

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  if (!visible) return null; // Do not render if not visible

  return (
    <div className="absolute top-[45vh] right-0 transform -translate-x-1/2 flex items-center justify-center animate-bounce">
      <svg
        className="w-6 h-6 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
      <p className="text-sm text-gray-500 ml-2">Scroll to view more</p>
    </div>
  );
};

export default ScrollIndicator;
