import React, { useEffect, useRef, useState } from "react";
import SearchCourseCard from "../../components/SearchCourseCard.jsx";
import { FaSpinner } from "react-icons/fa";
import axios from "axios";

const Search = ({
  searchPattern,
  lastResults,
  setLastResults,
  setIsSearchOpen,
}) => {
  const [courseResults, setCourseResults] = useState(
    lastResults || { byDesc: [], byTags: [], byTitle: [] }
  );
  const [isLoading, setIsLoading] = useState(false);
  const blurRegionRef = useRef(null);

useEffect(() => {
  const fetchResults = async () => {
    if (
      !searchPattern ||
      searchPattern === localStorage.getItem("searchQuery")
    ) {
      const cachedResults = localStorage.getItem("lastResults");
      if (cachedResults) {
        setCourseResults(JSON.parse(cachedResults));
      }
      return;
    }
    setIsLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/search/course/${searchPattern}`
      );
      setCourseResults(res.data);
      setLastResults(res.data);
      localStorage.setItem("searchQuery", searchPattern);
      localStorage.setItem("lastResults", JSON.stringify(res.data));
    } catch (error) {
      console.error("Error fetching search results:", error);
      setCourseResults({ byDesc: [], byTags: [], byTitle: [] });
    } finally {
      setIsLoading(false);
    }
  };

  fetchResults();
}, [searchPattern, setLastResults]);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (blurRegionRef.current && blurRegionRef.current === event.target) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSearchOpen]);

  return (
    <div className="w-full z-20 absolute backdrop-blur-2xl" ref={blurRegionRef}>
      <div className="max-w-5xl rounded-t-2xl ml-auto mr-auto bg-blue-50 z-30 overflow-scroll h-screen relative">
        {isLoading ? (
          <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">
            <FaSpinner className="animate-spin text-white text-4xl" />
          </div>
        ) : (
          <>
            <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-0 bg-blue-50 rounded-bl-3xl rounded-tl-3xl p-4 shadow-md hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-6 h-6 text-gray-800"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <h1 className="text-4xl font-bold text-white tracking-wide">
                Search Results for{" "}
                <span className="text-2xl">"{searchPattern}"</span>
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8">
              <section className="mb-12">
                <h2 className="text-2xl font-semibold mb-6">Courses</h2>
                {courseResults.byTitle.length === 0 &&
                courseResults.byTags.length === 0 &&
                courseResults.byDesc.length === 0 ? (
                  "No results found..."
                ) : (
                  <>
                    {["byTitle", "byTags", "byDesc"].map(
                      (category) =>
                        courseResults[category].length > 0 && (
                          <div key={category} className="mb-8">
                            <h3 className="text-xl font-medium mb-4 text-blue-600">
                              {category === "byTitle"
                                ? "By Title"
                                : category === "byDesc"
                                ? "By Description"
                                : "By Tags"}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                              {courseResults[category].map((course) => (
                                <div key={course.id}>
                                  <SearchCourseCard
                                    course={course}
                                    setIsSearchOpen={setIsSearchOpen}
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )
                    )}
                  </>
                )}
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Search;
