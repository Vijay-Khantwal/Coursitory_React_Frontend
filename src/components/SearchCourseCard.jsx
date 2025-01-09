import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const SearchCourseCard = ({ course, enrolled, setIsSearchOpen }) => {
  const navigate = useNavigate();

  const handleCourseClick = (course, enrolled) => {
    setIsSearchOpen(false);
    navigate("/courseDetails", { state: { course, enrolled } });
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2;
    for (let i = 1; i <= 5; i++) {
      if (i <= roundedRating) {
        stars.push(<FaStar key={i} className="text-accentColor" />);
      } else if (i - roundedRating === 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-accentColor" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-accentColor" />);
      }
    }
    return stars;
  };

  return (
    <div
      onClick={() => handleCourseClick(course, enrolled)}
      className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 w-full flex"
    >
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {course.title}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            {renderStars(course.rating)}
          </div>
        </div>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchCourseCard;
