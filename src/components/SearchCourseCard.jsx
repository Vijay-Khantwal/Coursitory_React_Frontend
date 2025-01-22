import React from "react";
import { useNavigate } from "react-router-dom";

const SearchCourseCard = ({ course, enrolled, setIsSearchOpen }) => {
  const navigate = useNavigate();

  const handleCourseClick = (course, enrolled) => {
    setIsSearchOpen(false);
    navigate(`/courseDetails/${course.id}`);
  };

  return (
    <div
      onClick={() => handleCourseClick(course, enrolled)}
      className="bg-white border-black border-b overflow-hidden cursor-pointer transform  transition-all duration-300 w-full p-4"
    >
      <div className="flex flex-col">
        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {course.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded"
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
