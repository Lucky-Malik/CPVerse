// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 100) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    return (
        <nav className={`fixed top-0 w-full z-50 transition-colors ${scrolled && isHome ? 'bg-white/95' : 'bg-green-black border-b border-green-900'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-black rounded-lg flex items-center justify-center">
                                <span className="text-green-100 font-bold text-sm">CP</span>
                            </div>
                            <span className="text-xl font-bold text-green-accent">CPVerse</span>
                        </Link>
                        
                        {!isHome && (
                            <div className="hidden md:flex items-center space-x-6">
                                <Link to="/dashboard.html" className={`font-medium pb-1 ${location.pathname==='/dashboard.html'?'text-green-accent border-b-2 border-green-accent':'text-green-accent hover:text-green-100 transition-colors'}`}>Dashboard</Link>
                                <Link to="/contests.html" className={`font-medium pb-1 ${location.pathname==='/contests.html'?'text-green-accent border-b-2 border-green-accent':'text-green-accent hover:text-green-100 transition-colors'}`}>Contests</Link>
                                <Link to="/practice.html" className={`font-medium pb-1 ${location.pathname==='/practice.html'?'text-green-accent border-b-2 border-green-accent':'text-green-accent hover:text-green-100 transition-colors'}`}>Practice</Link>
                                <Link to="/insights.html" className={`font-medium pb-1 ${location.pathname==='/insights.html'?'text-green-accent border-b-2 border-green-accent':'text-green-accent hover:text-green-100 transition-colors'}`}>Insights</Link>
                                <Link to="/friends.html" className={`font-medium pb-1 ${location.pathname==='/friends.html'?'text-green-accent border-b-2 border-green-accent':'text-green-accent hover:text-green-100 transition-colors'}`}>Friends</Link>
                            </div>
                        )}
                        {isHome && (
                            <div className="hidden md:flex items-center space-x-8">
                                <a href="#features" className="text-green-accent hover:text-green-100 transition-colors">Features</a>
                                <Link to="/dashboard.html" className="text-green-accent hover:text-green-100 transition-colors">Dashboard</Link>
                                <Link to="/contests.html" className="text-green-accent hover:text-green-100 transition-colors">Contests</Link>
                                <Link to="/practice.html" className="text-green-accent hover:text-green-100 transition-colors">Practice</Link>
                            </div>
                        )}
                    </div>
                    
                    {isHome ? (
                        <Link to="/dashboard.html" className="bg-gradient-to-r from-green-600 to-black text-green-100 px-6 py-2 rounded-lg font-medium hover:bg-green-700 hover:text-black transition-opacity">
                            Get Started
                        </Link>
                    ) : (
                        <div className="flex items-center space-x-4">
                            <Link to="/profile.html" className="text-green-accent hover:text-green-100 transition-colors">Profile</Link>
                            <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-black rounded-full flex items-center justify-center">
                                <span className="text-green-100 font-bold text-sm">LM</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
