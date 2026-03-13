import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 60);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isHome = location.pathname === '/';

    const navLinks = [
        { to: '/dashboard.html', label: 'Dashboard' },
        { to: '/contests.html', label: 'Contests' },
        { to: '/practice.html', label: 'Practice' },
        { to: '/insights.html', label: 'Insights' },
        { to: '/friends.html', label: 'Friends' },
    ];

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-[#080a0e]/95 backdrop-blur border-b border-gray-800/60' : 'bg-transparent'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-14">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-7 h-7 bg-gray-800 border border-gray-700 rounded-md flex items-center justify-center">
                            <span className="text-gray-200 font-bold text-xs">CP</span>
                        </div>
                        <span className="text-sm font-semibold text-gray-200 tracking-tight">CPVerse</span>
                    </Link>

                    {/* Nav links */}
                    <div className="hidden md:flex items-center gap-6">
                        {isHome ? (
                            <>
                                <a href="#features" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">Features</a>
                                <Link to="/dashboard.html" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">Dashboard</Link>
                                <Link to="/contests.html" className="text-sm text-gray-400 hover:text-gray-200 transition-colors">Contests</Link>
                            </>
                        ) : navLinks.map(link => (
                            <Link
                                key={link.to}
                                to={link.to}
                                className={`text-sm transition-colors ${
                                    location.pathname === link.to
                                        ? 'text-gray-100'
                                        : 'text-gray-500 hover:text-gray-300'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right */}
                    {isHome ? (
                        <Link to="/dashboard.html" className="text-xs font-medium px-3 py-1.5 rounded-md border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors">
                            Get Started
                        </Link>
                    ) : (
                        <Link to="/profile.html" className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-medium text-gray-300 hover:border-gray-500 transition-colors">
                            LM
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
