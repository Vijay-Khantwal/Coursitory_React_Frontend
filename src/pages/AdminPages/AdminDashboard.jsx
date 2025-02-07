import React, { useState, useEffect } from "react";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import toast from "react-hot-toast";
import axios from "axios";
import StarRating from "../../components/StarRating.jsx";
import NotFound from "../404ErrorPage/NotFound.jsx";
import Button from "../../components/Button.jsx";

const CourseCardAdmin = ({ course, onClick, isSelected }) => {

  return (
    <div
      onClick={() => onClick(course)}
      className={` rounded-xl shadow-lg overflow-hidden cursor-pointer transform hover:scale-105 transition-all duration-300 w-full flex
            ${
              isSelected
                ? "ring-2 ring-blue-500 scale-105 shadow-xl bg-blue-50"
                : "bg-white"
            }`}
    >
      <div className="p-4 flex-1">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-xl font-semibold text-gray-900 flex-1">
            {course.title}
          </h3>
          <div className="flex items-center gap-1 ml-2 flex-shrink-0">
            <StarRating rating={course.rating} colour="#FFA500" />
            
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

const AdminDashboard = () => {
  const [tags, setTags] = useState([""]);
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isVideoForm, setIsVideoForm] = useState(true);
  const [uploading, setUploading] = useState(false);
  if (!localStorage.getItem("adminToken")) {
    console.log("No authToken found : Please Login as an admin!");
    return <NotFound />;
  } else {
    localStorage.setItem("isLogged", true);
  }

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/courses`
        );
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const handleTagChange = (index, value) => {
    const updatedTags = [...tags];
    updatedTags[index] = value;

    if (value && index === tags.length - 1 && tags.length < 5) {
      updatedTags.push("");
    }

    setTags(updatedTags);
  };

  const handleRemoveTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      const form = e.target;
      const formData = new FormData();

      const title = form.title.value;
      const description = form.description.value;
      const file = form.thumbnail.files[0];
      const validTags = tags.filter((tag) => tag.trim() !== "");

      // Check if title and description are provided
      if (!title || !description) {
        toast.error("Title and description are required");
        return;
      }

      // Check title length
      if (title.length < 5) {
        toast.error("Title too short");
        return;
      }
      if (title.length > 40) {
        toast.error("Title too large");
        return;
      }

      // Check description length
      if (description.length < 5) {
        toast.error("Description too short");
        return;
      }
      if (description.length > 1500) {
        toast.error("Description too large");
        return;
      }

      // File type validation for thumbnail
      if (file) {
        const allowedImageTypes = [
          "image/jpeg",
          "image/png",
          "image/gif",
          "image/webp",
        ];
        if (!allowedImageTypes.includes(file.type)) {
          toast.error(
            "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)"
          );
          return;
        }
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          toast.error("Image size should be less than 5MB");
          return;
        }
      }

      // Append data to FormData
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", validTags);

      if (file) {
        formData.append("file", file);
      }

      toast.promise(
        axios.post(
          `${import.meta.env.VITE_API_URL}/admin/create/Course`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
              "Content-Type": "multipart/form-data",
            },
          }
        ),
        {
          loading: "Creating your Course...",
          success: () => {
            setIsModalOpen(false);
            window.location.reload();
            return "Course created successfully";
          },
          error: (error) => {
            console.log(error);
            if (error.response?.status === 401) {
              return <b>Session Expired!</b>;
            }
            return <b>Something went wrong! Login Again</b>;
          },
          finally: () => setUploading(false),
        }
      );
    } catch {
      console.log("Error in creating course");
    } finally {
      setUploading(false);
    }
  };

  const handleCardClick = (course) => {
    setSelectedCourse(course);
  };

  const handleVideoSubmit = async (e) => {
    setUploading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", e.target.video.files[0]);
    formData.append("title", e.target.title.value);
    formData.append("description", e.target.description.value);
    if (e.target.thumbnail.files[0]) {
      formData.append("thumbnail", e.target.thumbnail.files[0]);
    }

    if (e.target.video.files[0]) {
      const allowedVideoTypes = ["video/mp4", "video/webm", "video/quicktime"];
      if (!allowedVideoTypes.includes(e.target.video.files[0].type)) {
        toast.error("Please upload a valid video file (MP4, WebM, or MOV)");
        return;
      }
      const maxVideoSize = 200 * 1024 * 1024; // 200MB in bytes
      if (e.target.video.files[0].size > maxVideoSize) {
        toast.error("Video size should be less than 200MB");
        return;
      }
    }
    if (e.target.thumbnail.files[0]) {
      const allowedImageTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/webp",
      ];
      if (!allowedImageTypes.includes(e.target.thumbnail.files[0].type)) {
        toast.error(
          "Please upload a valid image file (JPEG, PNG, GIF, or WEBP)"
        );
        return;
      }
      const maxImageSize = 5 * 1024 * 1024; // 5MB in bytes
      if (e.target.thumbnail.files[0].size > maxImageSize) {
        toast.error("Image size should be less than 5MB");
        return;
      }
    }

    try {
      const adminToken = localStorage.getItem("adminToken");
      await toast.promise(
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/admin/upload_video/${
              selectedCourse.id
            }`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .catch((error) => {
            if (error.response?.status === 401) {
              window.location.href = "/login";
            }
            throw error;
          }),
        {
          loading: "Uploading video...",
          success: "Video uploaded successfully 👌",
          error: "Error uploading video 🤯 Login Again",
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  const handlePdfSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    const formData = new FormData();
    formData.append("file", e.target.pdf.files[0]);
    formData.append("title", e.target.title.value);

    if (e.target.pdf.files[0]) {
      const allowedPdfTypes = ["application/pdf"];
      if (!allowedPdfTypes.includes(e.target.pdf.files[0].type)) {
        toast.error("Please upload a valid PDF file");
        return;
      }
      const maxPdfSize = 10 * 1024 * 1024; // 10MB in bytes
      if (e.target.pdf.files[0].size > maxPdfSize) {
        toast.error("PDF size should be less than 10MB");
        return;
      }
    }

    try {
      const adminToken = localStorage.getItem("adminToken");
      await toast.promise(
        axios
          .post(
            `${import.meta.env.VITE_API_URL}/admin/upload_pdf/${
              selectedCourse.id
            }`,
            formData,
            {
              headers: {
                Authorization: `Bearer ${adminToken}`,
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .catch((error) => {
            if (error.response?.status === 401) {
              window.location.href = "/login";
            }
            throw error;
          }),
        {
          loading: "Uploading PDF...",
          success: "PDF uploaded successfully 👌",
          error: "Error uploading PDF 🤯",
        }
      );
    } catch (error) {
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 py-8">
        <h1 className="text-4xl font-bold text-center text-white">
          Admin Dashboard
        </h1>
        <p className="text-center text-white text-lg mt-2">
          Manage your courses and content
        </p>
      </div>

      <div className="min-h-screen bg-gray-50 py-8 px-4 lg:px-8">
        <div className="max-w-[1400px] mx-auto">
          <button
            disabled={uploading}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md mb-8"
            onClick={() => setIsModalOpen(true)}
          >
            + Create New Course
          </button>

          <div className="flex flex-col md:flex-row gap-6">
            {/* Main content area */}
            <div className="w-full md:w-1/2 lg:w-2/3 ">
              <h2 className="text-2xl font-semibold mb-6">All Courses</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <CourseCardAdmin
                    key={course.id}
                    course={course}
                    onClick={handleCardClick}
                    isSelected={selectedCourse?.id === course.id}
                  />
                ))}
              </div>
            </div>

            {/* Fixed upload section */}
            <div className="w-full md:w-1/2 lg:w-1/3 ">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-20">
                {selectedCourse ? (
                  <>
                    <div className="flex justify-center align-middle bg-blue-200 rounded-full mb-5 p-2">
                      Upload Area
                    </div>
                    <h2 className="text-xl font-bold mb-4">
                      {selectedCourse.title}
                    </h2>
                    <div className="flex gap-2 mb-6">
                      <button
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                          isVideoForm
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setIsVideoForm(true)}
                      >
                        Upload Video
                      </button>
                      <button
                        className={`flex-1 px-4 py-2 rounded-lg transition-colors ${
                          !isVideoForm
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                        onClick={() => setIsVideoForm(false)}
                      >
                        Upload PDF
                      </button>
                    </div>
                    {isVideoForm ? (
                      <form onSubmit={handleVideoSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Video File
                          </label>
                          <input
                            type="file"
                            name="video"
                            accept="video/*"
                            className="w-full border rounded-lg p-2"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            Thumbnail
                          </label>
                          <input
                            type="file"
                            name="thumbnail"
                            accept="image/*"
                            className="w-full border rounded-lg p-2"
                          />
                        </div>
                        <input
                          type="text"
                          name="title"
                          placeholder="Video Title"
                          className="w-full border rounded-lg p-2"
                          required
                        />
                        <textarea
                          name="description"
                          placeholder="Description"
                          className="w-full border rounded-lg p-2 min-h-[100px]"
                        />
                        <Button
                          type={"submit"}
                          onSubmit={handleVideoSubmit}
                          loading={uploading}
                        >
                          {uploading ? "Uploading..." : "Upload Video"}
                        </Button>
                      </form>
                    ) : (
                      <form onSubmit={handlePdfSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="block text-sm font-medium">
                            PDF File
                          </label>
                          <input
                            type="file"
                            name="pdf"
                            accept=".pdf"
                            className="w-full border rounded-lg p-2"
                            required
                          />
                        </div>
                        <input
                          type="text"
                          name="title"
                          placeholder="PDF Title"
                          className="w-full border rounded-lg p-2"
                          required
                        />
                        <Button
                          type={"submit"}
                          onSubmit={handlePdfSubmit}
                          loading={uploading}
                        >
                          {uploading ? "Uploading..." : "Upload PDF"}
                        </Button>
                      </form>
                    )}
                  </>
                ) : (
                  <p className="text-gray-500 text-center">
                    Select a course to manage uploads
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl mx-4 p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course title"
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Course Description
                  </label>
                  <textarea
                    name="description"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter course description"
                    rows="4"
                  ></textarea>
                </div>

                <div className="mb-6">
                  <label className="block text-gray-700 font-medium mb-2">
                    Thumbnail
                  </label>
                  <input
                    type="file"
                    name="thumbnail"
                    accept="image/*"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Tags
                  </label>
                  {tags.map((tag, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                      <input
                        type="text"
                        className="block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        placeholder={`Tag ${index + 1}`}
                        value={tag}
                        onChange={(e) => handleTagChange(index, e.target.value)}
                      />
                      {index < tags.length - 1 && (
                        <button
                          type="button"
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleRemoveTag(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-4">
                  <button
                    type="button"
                    className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    Cancel
                  </button>
                  <Button type={"submit"} loading={uploading}>
                    {uploading ? "Creating Course..." : "Create Course"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default AdminDashboard;
