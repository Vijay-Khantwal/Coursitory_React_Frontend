import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <div className="footer-brand">
          <div className="text-gray-300 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Coursitory
          </div>
        </div>
        <div>
          <a
            href="https://github.com/Vijay-Khantwal/Coursitory_React_Frontend"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300 text-lg font-medium tracking-wide"
          >
            <span>Want to make your own Coursitory? ✨</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
