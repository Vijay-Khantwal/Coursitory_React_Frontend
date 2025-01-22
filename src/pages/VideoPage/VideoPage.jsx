import React from "react";
import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import axios from "axios";

const VideoPage = () => {
  const { courseId, vidId } = useParams();
  const [video, setVideo] = useState({});
  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/get/metadata/${vidId}`
        );
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

    fetchVideo();
  }, [vidId]);
  console.log(video);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Video Player Section */}
          <div className="w-full lg:w-3/4 aspect-video rounded-lg bg-black">
            <VideoPlayer courseId={courseId} video={video} />
          </div>

          {/* Video Information Section */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {video.title}
            </h1>

            {/* Meta Information */}
            {video && video.fileId && video.fileId.date && (
              <span className="text-sm text-gray-600 pl-1">
                Uploaded on: {new Date(video.fileId.date).toLocaleDateString()}
              </span>
            )}

            {/* Description */}
            <div className="bg-white p-6 mt-3 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-800 mb-3">
                Description
              </h2>
              <p className="text-gray-600 whitespace-pre-line">
                {video.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default VideoPage;
