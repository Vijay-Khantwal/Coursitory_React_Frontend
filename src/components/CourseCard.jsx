import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/icon_3_white.png";

import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const CourseCard = ({ course, enrolled }) => {
  const [imageData, setImageData] = useState(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/get/image/${course.thumbnail}`
        );
        const data = await response.json();
        setImageData(`data:${data.type};base64,${data.data}`);
      } catch (error) {
        console.error("Error fetching image:", error);
      } finally {
        setLoading(false);
      }
    };

    if (course.thumbnail) {
      fetchImage();
    } else {
      setImageData(null);
      setLoading(false);
    }
  }, [course.thumbnail]);

  const handleCourseClick = (course, enrolled) => {
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
        className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 w-full max-w-sm"
    >
        <div className="relative w-full pt-[56.25%]">
            {loading ? (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 animate-pulse flex items-center justify-center">
                    <img
                        src={logo}
                        alt={course.title}
                        className="w-40 h-40 object-contain opacity-90 hover:opacity-100"
                    />
                </div>
            ) : (
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 flex items-center justify-center">
                    <img
                        src={imageData || logo}
                        alt={course.title}
                        className={
                            imageData
                                ? "w-full h-full object-cover opacity-90"
                                : "w-40 h-40 object-contain opacity-90"
                        }
                    />
                </div>
            )}
        </div>

        <div className="p-5">
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

export default CourseCard;