import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

const NotFound = () => {
  return (
    <>
      <Header />
      <div className="px-4 bg-gradient-to-br from-blue-100 via-blue-100 to-blue-50">
        <div className="  flex flex-col items-center justify-center h-[calc(100vh-64px)]  text-gray-800 overflow-auto">
          <h1 className="text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
            404
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mt-4">
            Oops! We can't seem to find the page you're looking for.
          </p>
          <p className="text-lg text-gray-600 mt-2">
            It might have been removed, renamed, or did not exist in the first
            place.
          </p>
          <Link
            to="/"
            className="mt-8 px-6 py-3 bg-blue-600 text-white text-lg font-medium rounded-lg shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFound;
