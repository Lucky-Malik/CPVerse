// src/components/Footer.jsx
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-black text-green-100 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex items-center justify-center space-x-2 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-black rounded-lg flex items-center justify-center">
                            <span className="text-green-100 font-bold text-sm">CP</span>
                        </div>
                        <span className="text-xl font-bold text-green-accent">CPVerse</span>
                    </div>
                    <p className="text-green-100 mb-4">Unifying your competitive programming journey</p>
                    <div className="flex justify-center space-x-6 text-sm text-green-100">
                        <a href="#" className="hover:text-green-accent transition-colors">GitHub</a>
                        <a href="#" className="hover:text-green-accent transition-colors">Contact</a>
                        <a href="#" className="hover:text-green-accent transition-colors">Privacy</a>
                        <a href="#" className="hover:text-green-accent transition-colors">Terms</a>
                    </div>
                    <div className="mt-6 pt-6 border-t border-green-900 text-green-100 text-sm">
                        © 2025 CPVerse. Built for the competitive programming community.
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
