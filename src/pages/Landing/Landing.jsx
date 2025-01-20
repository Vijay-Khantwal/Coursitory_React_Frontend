import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import image from "../../assets/landingfinal.png";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <div className="bg-gray-50 text-gray-800">
        <section className="relative bg-gradient-to-r from-blue-700 to-blue-400 text-white overflow-hidden">
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="w-full h-full relative">
              <motion.div
                className="absolute top-0 left-1/2 w-1/3 h-full hidden lg:block rounded-l-full border-t border-b border-l border-gray-300 opacity-50"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              ></motion.div>
              <motion.div
                className="absolute top-0 left-2/3 w-1/3 h-full hidden md:block rounded-l-full border-t border-b border-l border-gray-300 opacity-50"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              ></motion.div>
              <motion.div
                className="absolute top-0 left-[72%] w-1/3 h-full hidden md:block rounded-l-full border-t border-b border-l border-gray-300 opacity-50"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              ></motion.div>
              <motion.div
                className="absolute top-0 left-[60%] w-1/3 h-full hidden lg:block rounded-l-full border-t border-b border-l border-gray-300 opacity-50"
                initial={{ x: "100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.0, ease: "easeOut" }}
              ></motion.div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 items-center z-10 relative">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1
                className="text-4xl md:text-5xl font-bold mb-4"
                style={{ lineHeight: "1.2" }}
              >
                Empower Your Learning with{" "}
                <span className="text-yellow-300">Coursitory</span>
              </h1>
              <p className="text-lg md:text-xl mb-6 leading-relaxed">
                Explore niche courses or create your own personalized website
                for courses.
              </p>
              <button
                onClick={() => navigate("/courses")}
                className="bg-yellow-300 text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-yellow-400"
              >
                Explore Now
              </button>
            </motion.div>
            <motion.div
              className="relative ml-auto w-60"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 blur-lg"></div>
              <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full blur-lg"></div>
              <div className="absolute inset-0 bg-white bg-opacity-10 rounded-full blur-lg"></div>
              <div className="absolute inset-0 bg-white bg-opacity-30 rounded-full blur-lg"></div>
              <div className="absolute inset-0 bg-white bg-opacity-40 rounded-full blur-lg"></div>
              <img
                src={image}
                alt="landingImage"
                className="relative rounded-lg"
              />
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              Why Choose <span className="text-blue-600">Coursitory</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div
                className="bg-white shadow-md rounded-lg p-6 hover:scale-105 duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold text-blue-600 mb-4">
                  For Learners
                </h3>
                <p className="mb-4 leading-relaxed">
                  Discover niche courses that match your interests and career
                  goals. Connect with like-minded learners and build meaningful
                  relationships while expanding your knowledge.
                </p>
                <ul className="list-disc pl-6">
                  <li>Access a wide range of unique courses.</li>
                  <li>Join a community of passionate learners.</li>
                  <li>Learn at your own pace with videos and PDFs.</li>
                </ul>
              </motion.div>
              <motion.div
                className="bg-white shadow-md rounded-lg p-6 hover:scale-105 duration-500"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="text-2xl font-semibold text-green-600 mb-4">
                  For Creators
                </h3>
                <p className="mb-4 leading-relaxed">
                  Build your own course website with ease. Add a personal touch
                  to your offerings and create a unique learning experience for
                  your audience.
                </p>
                <ul className="list-disc pl-6">
                  <li>Create site and upload your own courses.</li>
                  <li>Customize your website with a personalized touch.</li>
                  <li>Reach a global audience and monetize your expertise.</li>
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-10">
              How to Get Started
            </h2>
            <div className="flex justify-center">
              <div className="flex flex-col items-center mx-2">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  1
                </div>
                <p className="text-center font-medium">Make an Account</p>
              </div>
              <div className="h-1 translate-y-8 bg-gray-300 flex-1 mx-4"></div>  
              <div className="flex flex-col items-center mx-2 ">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  2
                </div>
                <p className="text-center font-medium">Enroll into a Course</p>
              </div>
              <div className="h-1 translate-y-8 bg-gray-300 flex-1 mx-4"></div>
              <div className="flex flex-col items-center mx-2">
                <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center mb-4">
                  3
                </div>
                <p className="text-center font-medium">Start Learning</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-blue-600  text-white py-16  bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Ready to Get Started with{" "}
              <span className="text-yellow-300">Coursitory</span>?
            </h2>
            <p className="text-lg mb-8 leading-relaxed"></p>
            <motion.button
              onClick={() => navigate("/register")}
              className="bg-yellow-300 text-blue-800 px-8 py-3 rounded-md font-semibold hover:bg-yellow-400"
              whileHover={{ scale: 1.1 }}
            >
              Join Us Today
            </motion.button>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default LandingPage;
