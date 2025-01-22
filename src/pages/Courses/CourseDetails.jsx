import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import axios from "axios";
import Header from "../../components/Header";
import toast from "react-hot-toast";
import logo from "../../assets/icon_3_white.png";
import Footer from "../../components/Footer";
import NotFound from "../404ErrorPage/NotFound";
import CourseReview from "../../components/ReviewComponents/CourseReview";
import PaymentCard from "./PaymentPopup/PaymentCard";

const CourseMaterial = ({
  course,
  videoMetadata,
  loading,
  thumbnails,
  isEnrolled,
}) => {
  const navigate = useNavigate();
  const handleVideoClick = (course, video) => {
    const courseId = course.id;
    // console.log(courseId);
    if (!isEnrolled) {
      toast.error("Please enroll in the course to view the video");
      return;
    }
    navigate(`/videoPage/${course.id}/${video.id}`);
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="relative aspect-video rounded-xl shadow-lg bg-gray-200 animate-pulse transform hover:scale-105 transition-transform duration-300"
            >
              <div className="h-6 bg-gray-300 rounded w-1/2 absolute bottom-0 m-4"></div>
            </div>
          ))}
        </div>
      ) : videoMetadata.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {videoMetadata.map((video, index) => (
            <div
              key={index}
              className="group relative aspect-video rounded-xl overflow-hidden shadow-lg cursor-pointer transform hover:scale-105 transition-all duration-300 border border-gray-200"
              onClick={() => handleVideoClick(course, video)}
            >
              <div className="absolute rounded-t-2xl top-0 right-0 w-10 h-10 bg-primaryActionButton text-white rounded-bl-full flex items-center justify-center font-semibold z-10 pl-2 pb-1">
                {index + 1}
              </div>
              {thumbnails[video.thumbnail] ? (
                <img
                  src={thumbnails[video.thumbnail] || { logo }}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 animate-pulse"></div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent group-hover:from-black/90 transition-all duration-300">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg
                    className="w-16 h-16 text-white"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white text-xl font-semibold group-hover:translate-y-[-4px] transition-transform duration-300 line-clamp-2 overflow-hidden text-ellipsis">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No content available yet
        </p>
      )}
    </div>
  );
};

const ReadingSections = ({ pdfList, loading, isEnrolled }) => {
  const handlePdfClick = (e, pdf) => {
    if (!isEnrolled) {
      e.preventDefault();
      toast.error("Please enroll in the course to view the pdf");
      return;
    }
  };

  return (
    <div className="container mx-auto">
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="h-28 rounded-xl bg-gray-200 animate-pulse shadow-lg"
            ></div>
          ))}
        </div>
      ) : pdfList.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pdfList.map((pdf, index) => (
            <a
              key={index}
              href={`${import.meta.env.VITE_API_URL}/get/pdf/${pdf}`}
              target="_blank"
              className="block"
              onClick={(e) => handlePdfClick(e, pdf)}
            >
              <div className="bg-white rounded-xl border-2 p-6 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900">
                    PDF {index + 1}
                  </h3>
                </div>
              </div>
            </a>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center text-lg">
          No PDFs available yet
        </p>
      )}
    </div>
  );
};

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState({
    videoList: [],
    pdfList: [],
    title: "",
    description: "",
    rating: "",
  });
  const [activeTab, setActiveTab] = useState("courseMaterial");
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(true);
  const [videoMetadata, setVideoMetadata] = useState([]);
  const [thumbnails, setThumbnails] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/course/${id}`
        );
        setCourse(response.data);
      } catch (error) {
        if (error.response.status === 500) {
          navigate("/404");
        }
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [id]);

  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem("token");
      console.log("here "+ course.id);
      if(!course.id)return; 

      setIsEnrolling(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/check/enrollment/${course.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setIsEnrolled(response.data);
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("isLogged");
      } finally {
        setIsEnrolling(false);
      }
    };

    checkEnrollment();
  }, [isEnrolled, course.id]);

  const [isOpen,setIsOpen] = useState(false);
  const handleEnroll = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login to enroll in the course");
      navigate("/login");
      return;
    }
    setIsOpen(true);
    setShowPaymentCard(true);
  };

  useEffect(() => {
    const fetchVideoMetadata = async () => {
      setLoading(true);
      try {
        // Fetch metadata for all videos concurrently
        const metadataPromises = course.videoList.map((videoId) =>
          axios
            .get(`${import.meta.env.VITE_API_URL}/get/metadata/${videoId}`)
            .then((response) => response.data)
        );
        const metadata = await Promise.all(metadataPromises);
        setVideoMetadata(metadata);

        // Fetch thumbnails only once
        metadata.forEach(async (video) => {
          if (!video.thumbnail) {
            setThumbnails((prev) => ({
              ...prev,
              [video.thumbnail]: logo,
            }));
          } else {
            try {
              const response = await axios.get(
                `${
                  import.meta.env.VITE_API_URL
                }/get/image/${video.thumbnail.toString()}`
              );
              setThumbnails((prev) => ({
                ...prev,
                [video.thumbnail]: `data:${response.data.type};base64,${response.data.data}`,
              }));
            } catch (error) {
              console.error("Error fetching thumbnail:", error);
              // Set logo as fallback if thumbnail fetch fails
              setThumbnails((prev) => ({
                ...prev,
                [video.thumbnail]: logo,
              }));
            }
          }
        });
      } catch (error) {
        console.error("Error fetching video metadata:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoMetadata();
  }, [course.videoList]);

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

  const [showPaymentCard, setShowPaymentCard] = useState(false);

  return (
    <>
      {" "}
      <Header />
      <div>
        {showPaymentCard && (
          <PaymentCard
            course={course}
            isOpen={isOpen}
            onClose={() => setShowPaymentCard(false)}
          />
        )}
      </div>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="h-32 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-t-2xl flex items-center justify-center">
              <h1 className="p-6 text-4xl font-bold text-white tracking-wide">
                About the Course
              </h1>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-6">
                <h1 className="text-4xl font-bold text-gray-900">
                  {course.title}
                </h1>

                <button
                  onClick={handleEnroll}
                  disabled={isEnrolled || isEnrolling}
                  className={`w-32 h-12 flex items-center justify-center rounded-lg text-white font-semibold text-lg
            shadow-lg transform transition-all duration-300 ease-in-out p-2
            ${
              isEnrolled
                ? "bg-gradient-to-r from-green-400 to-green-600 cursor-default hover:shadow-green-200"
                : isEnrolling
                ? "bg-blue-400 cursor-wait animate-pulse"
                : "bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            }`}
                >
                  {isEnrolling ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : isEnrolled ? (
                    <span className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Enrolled
                    </span>
                  ) : (
                    "Enroll Now"
                  )}
                </button>
              </div>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex">{renderStars(course.rating)}</div>
                <span className="text-lg font-semibold text-gray-700 flex items-center">
                  <span className="text-2xl text-accentColor">
                    {parseFloat(course.rating).toFixed(2)}
                  </span>
                  <span className="text-gray-400 ml-1">/5.0</span>
                </span>
              </div>
              <p className="text-lg text-gray-600 mb-6">
                {isDescriptionExpanded
                  ? course.description
                  : `${course.description.slice(0, 200)}...`}
                {course.description.length > 200 && (
                  <button
                    onClick={() =>
                      setIsDescriptionExpanded(!isDescriptionExpanded)
                    }
                    className="ml-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
                  >
                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                  </button>
                )}
              </p>
              <div className="flex justify-center space-x-8 mb-8">
                {["courseMaterial", "readingSections"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-6 py-2 text-lg font-medium rounded-lg transition-all duration-200 ${
                      activeTab === tab
                        ? "text-blue-600 bg-blue-50"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab === "courseMaterial"
                      ? "Course Material"
                      : "Reading Section"}
                  </button>
                ))}
              </div>
              {activeTab === "courseMaterial" && (
                <CourseMaterial
                  course={course}
                  videoMetadata={videoMetadata}
                  loading={loading}
                  thumbnails={thumbnails}
                  isEnrolled={isEnrolled}
                />
              )}
              {activeTab === "readingSections" && (
                <ReadingSections
                  pdfList={course.pdfList}
                  loading={loading}
                  isEnrolled={isEnrolled}
                />
              )}
            </div>
            <div className="bg-slate-50 pt-4 px-4">
              <h1 className="text-3xl font-medium w-full p-4 text-gray-900 rounded-md">
                User Rating and Reviews
              </h1>
              <CourseReview
                courseId={course.id}
                isEnrolled={isEnrolled}
              ></CourseReview>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
