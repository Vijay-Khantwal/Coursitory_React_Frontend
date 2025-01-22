import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import Footer from "../../components/Footer.jsx";

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState("allCourses");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = "Vijay's";

  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location.state]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        // First fetch all courses
        const allCoursesResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/courses`
        );
        setAllCourses(allCoursesResponse.data);

        // Then fetch enrolled courses if token exists
        if (token) {
          try {
            const enrolledResponse = await axios.get(
              `${import.meta.env.VITE_API_URL}/user/get/courses`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (enrolledResponse.status === 401) {
              setIsLogged(false);
              localStorage.removeItem("isLogged");
              setActiveSection("allCourses");
              setEnrolledCourses([]);
              return;
            }

            if (enrolledResponse.status === 204) {
              setEnrolledCourses([]);
              setIsLogged(true);
              return;
            }

            setEnrolledCourses(enrolledResponse.data);
          } catch (enrolledError) {
            console.error("Error fetching enrolled courses:", enrolledError);
            setIsLogged(false);
            setActiveSection("allCourses");
          }
        } else {
          setIsLogged(false);
          localStorage.removeItem("isLogged");
          setActiveSection("allCourses");
        }
      } catch (error) {
        setIsLogged(false);
        setActiveSection("allCourses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  return (
    <>
      <Header />
      <div className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-8">
        <h1 className="text-2xl md:text-4xl font-bold text-center text-white">
          Welcome to{" "}
          <a
            href="https://www.linkedin.com/in/vijay-khantwal/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-yellow-300 transition-colors duration-300"
          >
            {name}
          </a>{" "}
          <span>Coursitory</span>
        </h1>
      </div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {["allCourses", "enrolledCourses"].map((section) => (
              <button
                key={section}
                onClick={() => {
                  setActiveSection(section);
                  navigate("/courses", { state: { activeSection: section } });
                }}
                className={`px-4 py-2 text-sm md:text-lg font-medium rounded-lg transition-all duration-200 ${
                  activeSection === section
                    ? "text-blue-600 bg-blue-50"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                {section === "allCourses" ? "Explore" : "Enrolled Courses"}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 justify-items-center">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse w-full max-w-sm"
                >
                  <div className="h-36 md:h-48 bg-gray-200"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div>
              {activeSection === "enrolledCourses" &&
              enrolledCourses.length === 0 ? (
                <div className="text-center py-10">
                  <p className="text-lg md:text-xl text-gray-600">
                    Enroll into courses to start learning
                  </p>
                  <div className="mt-4">
                    <svg
                      className="mx-auto h-40 w-40 sm:h-60 sm:w-60 md:h-80 md:w-80 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 14l9-5-9-5-9 5 9 5z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 20v-6"
                      />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 xl:grid-cols-3 justify-items-center">
                    {activeSection === "allCourses"
                      ? allCourses.map((course, index) => (
                          <CourseCard key={index} course={course} />
                        ))
                      : enrolledCourses.map((course, index) => (
                          <CourseCard key={index} course={course} />
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CoursePage;
