import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header.jsx";
import CourseCard from "../../components/CourseCard.jsx";
import toast from "react-hot-toast";
import Footer from "../../components/Footer.jsx";

const CoursePage = () => {
  const [activeSection, setActiveSection] = useState("allCourses");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const name = "Aster Joules's";
  useEffect(() => {
    if (location.state?.activeSection) {
      setActiveSection(location.state.activeSection);
    }
  }, [location]);

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem("token");
      setLoading(true);

      try {
        // First fetch all courses
        const allCoursesResponse = await fetch(`${import.meta.env.VITE_API_URL}/get/courses`);
        const allCoursesData = await allCoursesResponse.json();
        setAllCourses(allCoursesData);

        // Then fetch enrolled courses if token exists
        if (token) {
          const enrolledResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/get/courses`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (enrolledResponse.status === 401) {
            setIsLogged(false);
            localStorage.removeItem('isLogged');
            setActiveSection("allCourses");
            setEnrolledCourses([]);
            toast.error("Session expired. Please login again.");
            return;
          }

          if (enrolledResponse.status === 204) {
            setEnrolledCourses([]);
            setIsLogged(true);
            return;
          }

          const enrolledData = await enrolledResponse.json();
          setEnrolledCourses(enrolledData);
        } else {
          setIsLogged(false);
          localStorage.removeItem('isLogged');
          setActiveSection("allCourses");
        }
      } catch (error) {
        // console.error("Error fetching courses:", error);
        setIsLogged(false);
        localStorage.removeItem('isLogged');
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
        <h1 className="text-4xl font-bold text-center text-white">
          Welcome to {name}{" "}
          <span className="text-yellow-300">Coursitory</span>
        </h1>
      </div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-8 mb-8">
            {["allCourses", "enrolledCourses"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                // () =>  navigate('/landing', { state: { activeSection: section } })
                className={`px-6 py-2 min-w-48 text-lg font-medium rounded-lg transition-all duration-200 ${
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
              {[...Array(6)].map((_, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse w-full max-w-sm"
                >
                  <div className="h-48 bg-gray-200"></div>
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
                  <p className="text-xl text-gray-600">
                    Enroll into courses to start learning
                  </p>
                  <div className="mt-4">
                    <svg
                      className="mx-auto h-80 w-80 text-gray-400"
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
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:grid-cols-3 justify-items-center">
                    {activeSection === "allCourses"
                      ? allCourses.map((course, index) => (
                          <CourseCard
                            key={index}
                            course={course}
                          />
                        ))
                      : enrolledCourses.map((course, index) => (
                          <CourseCard
                            key={index}
                            course={course}
                          />
                        ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <Footer/>
    </>
  );
};

export default CoursePage;