import React, { useEffect, useRef, useState } from "react";
import SearchCourseCard from "../../components/SearchCourseCard.jsx";

import axios from "axios";
import ScrollIndicator from "./ScrollIndicator.jsx";
import LoadingCircle from "../../components/Icons/LoadingCircle.jsx";

const Search = ({ searchPattern, setIsSearchOpen }) => {
  const [courseResults, setCourseResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchPattern, setDebouncedSearchPattern] = useState("");
  const blurRegionRef = useRef(null);
  const isLogged = localStorage.getItem("isLogged");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchPattern(searchPattern);
    }, 700);

    return () => {
      clearTimeout(handler);
    };
  }, [searchPattern]);

  useEffect(() => {
    if (!debouncedSearchPattern) {
      setCourseResults([]);
      return;
    }

    const fetchResults = async () => {
      setIsLoading(true);
      try {
        const res = await axios.get(
          `${
            import.meta.env.VITE_API_URL
          }/search/course/${debouncedSearchPattern}`
        );

        const courses = res.data?.data || [];
        const uniqueCourses = courses.filter(
          (course, index, self) =>
            index === self.findIndex((c) => c.id === course.id)
        );

        setCourseResults(uniqueCourses);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setCourseResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResults();
  }, [debouncedSearchPattern]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        blurRegionRef.current &&
        !blurRegionRef.current.contains(event.target)
      ) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearchOpen]);

  return (
    <div
      className={`${
        isLogged ? "left-[26vw] -translate-x-1" : "left-[25vw] -translate-x-2"
      } absolute bg-white shadow-lg rounded-md w-[50vw] max-w-2xl p-4 max-h-[50vh]  top-[60px] overflow-y-scroll overflow-x-hidden hidden lg:block no-scrollbar`}
      ref={blurRegionRef}
    >
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className=" w-12 animate-spin flex justify-center items-center text-gray-800 mt-8">
            <LoadingCircle />
          </div>
        </div>
      ) : (
        <>
          {Array.isArray(courseResults) && courseResults.length > 0 ? (
            <div className="relative flex-col">
              {courseResults.map((course) => (
                <div key={course.id}>
                  <SearchCourseCard
                    course={course}
                    setIsSearchOpen={setIsSearchOpen}
                  />
                </div>
              ))}
              {courseResults.length > 4 && <ScrollIndicator />}
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No results found...</p>
          )}
        </>
      )}
    </div>
  );
};

export default Search;
