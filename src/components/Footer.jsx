import React from 'react';
import { Link } from 'react-router-dom';

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
                    <Link 
                        to="/about" 
                        className="hover:text-blue-400 transition-colors duration-300 text-lg font-medium tracking-wide"
                    >
                        <span>Want to make your own Coursitory? ✨</span>
                    </Link>
                </div>
            </div>
        </footer>
    );
};

export default Footer;