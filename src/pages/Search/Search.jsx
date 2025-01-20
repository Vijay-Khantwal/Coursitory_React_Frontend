import React, { useEffect, useRef, useState } from "react";
import SearchCourseCard from "../../components/SearchCourseCard.jsx";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";
import ScrollIndicator from "./ScrollIndicator.jsx";

const Search = ({ searchPattern, setIsSearchOpen }) => {
  const [courseResults, setCourseResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debouncedSearchPattern, setDebouncedSearchPattern] = useState(""); // Debounced search pattern
  const blurRegionRef = useRef(null); // Ref for detecting outside clicks
  const isLogged = localStorage.getItem("isLogged");

  // Debounce the search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchPattern(searchPattern); // Update debounced value after delay
    }, 700); // 500ms delay

    return () => {
      clearTimeout(handler); // Clear timeout if the user keeps typing
    };
  }, [searchPattern]);

  // Fetch search results based on the debounced value
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

  // Close the search bar when clicking outside the search area
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
      className={`${isLogged ?"left-[26vw] -translate-x-1" : "left-[25vw] -translate-x-2" } absolute bg-white shadow-lg rounded-md w-[50vw] max-w-2xl p-4 max-h-[50vh]  top-[60px] overflow-y-scroll overflow-x-hidden hidden md:block no-scrollbar`}
      ref={blurRegionRef}
    >
      {isLoading ? (
        <FaSpinner className="animate-spin text-gray-800 text-4xl mt-8" />
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
