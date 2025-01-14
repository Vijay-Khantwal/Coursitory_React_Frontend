import React from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer.jsx";
import Header from "../../components/Header.jsx";
import Footer from "../../components/Footer.jsx";
import NotFound from "../404ErrorPage/NotFound.jsx";

const VideoPage = () => {
  const location = useLocation();
  if (!location.state) {
    console.log("No state found : Video data missing!");
    return <NotFound />;
  }
  const { courseId, video, thumbnailSource } = location.state;
  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Video Player Section */}
          <div className="w-3/4 aspect-video rounded-lg bg-black min-w-[600px]">
            <VideoPlayer
              courseId={courseId}
              video={video}
              thumbnailSource={thumbnailSource}
            />
          </div>

          {/* Video Information Section */}
          <div className="mt-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {video.title}
            </h1>

            {/* Meta Information */}
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-sm text-gray-600">
                Uploaded on: {new Date(video.fileId.date).toLocaleDateString()}
              </span>
            </div>

            {/* Description */}
            <div className="bg-white p-6 rounded-lg shadow-md">
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
