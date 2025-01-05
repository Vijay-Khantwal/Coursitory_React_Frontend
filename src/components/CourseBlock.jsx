import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const CourseBlock = ({ course }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/courseDetails', { state: { course } });
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
        <div className="group" onClick={handleClick}>
            <div className="border p-4 rounded-lg shadow-md mb-4 flex bg-primaryBackground duration-300 group-hover:scale-105 cursor-pointer h-44">
                <div className="flex-shrink-0 w-32 h-32 bg-gradient-to-r from-primaryActionButton via-linkColor to-successMessage rounded-lg mr-4"></div>
                <div className="flex-grow">
                    <h2 className="text-2xl font-bold mb-2 text-text">{course.title}</h2>
                    <div className="flex mb-4">
                        {renderStars(course.rating)}
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                        {course.tags.map((tag, index) => (
                            <span key={index} className="bg-backgroundSections text-text text-sm font-semibold px-2.5 py-0.5 rounded">{tag}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseBlock;