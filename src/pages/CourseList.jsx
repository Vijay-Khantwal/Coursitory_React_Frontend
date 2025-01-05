import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import CourseBlock from '../components/CourseBlock';

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/get/courses`);
        const data = await response.json();
        // await new Promise((resolve) => setTimeout(resolve, 1000));
        setCourses(data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 border-b pb-4">
            Developer's Coursitory
            <span className="block text-sm font-normal text-gray-500 mt-2">
              Explore our curated collection of developer courses
            </span>
          </h1>

          {loading ? (
  <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2"> {/* Modified grid */}
    {[...Array(3)].map((_, index) => (
      <div 
        key={index} 
        className="bg-gray-100 rounded-xl p-4 h-48 animate-pulse"
      >
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
      </div>
    ))}
  </div>
) : (
  <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-2"> {/* Modified grid */}
    {courses.map((course) => (
      <CourseBlock key={course.id} course={course} />
    ))}
  </div>
)}
        </div>
      </div>
    </div>
  );
};

export default CourseList;