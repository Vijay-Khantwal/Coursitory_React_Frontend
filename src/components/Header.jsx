import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/icon_3_blue.png";
import Search from "../pages/Search/Search.jsx"; // Import the Search component
import toast from "react-hot-toast";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const navigate = useNavigate();
  const isLogged = localStorage.getItem("isLogged");
  const [lastResults, setLastResults] = useState(
    JSON.parse(localStorage.getItem("lastResults")) || null
  );
  const [searchQuery, setSearchQuery] = useState(
    localStorage.getItem("searchQuery") || ""
  );

  const handleSearch = (query) => {
    if (query.length < 3) {
      toast("Please enter atleast 3 characters to search", {
        icon: "ℹ️",
        position: "top-right",
      });
      return;
    }
    setSearchQuery(query);
    setIsSearchOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogged");
    localStorage.removeItem("lastResults");
    localStorage.removeItem("searchQuery");
    navigate("/login");
  };

  const handleSectionClick = (section) => {
    setIsDropdownOpen(false);
    navigate("/courses", { state: { activeSection: section } });
  };

  const handleFocus = () => {
    if (lastResults == null) {
      return;
    }
    setIsSearchOpen(true);
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            to="/"
            className="flex items-center ml-[-1rem] hover:cursor-pointer"
          >
            <img
              src={logo}
              alt="Coursitory Logo"
              className="h-12 w-auto transition-transform hover:scale-105"
            />
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent ml-3">
              Coursitory
            </div>
          </Link>

          <div className="hidden md:block flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search courses..."
                className="w-full px-4 py-2 rounded-full border-2 border-gray-200 
                                focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200 
                                transition-all duration-200 bg-gray-50"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSearch(e.target.value);
                  }
                }}
                onFocus={handleFocus}
              />
              <svg
                onClick={() =>
                  handleSearch(document.querySelector("input").value)
                }
                className="cursor-pointer h-5 w-5 absolute right-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          <div className="flex min-w-40 items-center gap-4 mr-[-1rem]">
            {" "}
            {/* Added negative margin */}
            {isLogged ? (
              <div className="relative ml-auto">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="p-2 rounded-full hover:bg-gray-100"
                >
                  <svg
                    className="h-10 w-10 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 ">
                    <a
                      onClick={() => handleSectionClick("allCourses")}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Explore
                    </a>
                    <a
                      onClick={() => handleSectionClick("enrolledCourses")}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Enrolled Courses
                    </a>
                    <a
                      onClick={handleLogout}
                      className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 rounded-full bg-transparent border-2 border-blue-600 
                                    text-blue-600 font-semibold hover:bg-blue-50 transition-all duration-200"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-6 py-2 rounded-full bg-blue-600 text-white font-semibold 
                                    hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        </div>
      </div>
      {isSearchOpen && (
        <Search
          searchPattern={searchQuery}
          lastResults={lastResults}
          setLastResults={setLastResults}
          setIsSearchOpen={setIsSearchOpen}
        />
      )}
    </header>
  );
};

export default Header;
