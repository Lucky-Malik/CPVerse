import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffect from '../components/BackgroundEffect';

const HomePage = () => {
    return (
        <>
            <section className="hero-bg min-h-screen flex items-center justify-center relative overflow-hidden pt-16">
                <BackgroundEffect type="dots" id="vanta-bg" className="absolute inset-0" />
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
                    <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                        One Dashboard for<br />
                        <span className="text-yellow-300">All Your CP Stats</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto">
                        Unify your competitive programming journey across Codeforces, AtCoder, LeetCode, and more. 
                        Track ratings, analyze practice patterns, and never miss a contest again.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link to="/dashboard.html" className="bg-white text-purple-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
                            🚀 Explore Dashboard
                        </Link>
                        <a href="#features" className="glass-effect text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/30">
                            ✨ View Features
                        </a>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-20 bg-green-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-green-accent mb-4">Everything You Need in One Place</h2>
                        <p className="text-xl text-green-100 max-w-3xl mx-auto">
                            From rating tracking to AI-powered insights, we've got every aspect of your competitive programming journey covered.
                        </p>
                    </div>
                    
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div className="feature-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="rating-card w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">📊</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Unified Ratings</h3>
                            <p className="text-gray-600 mb-4">Track your ratings across all major platforms in one beautiful dashboard with real-time updates.</p>
                            <div className="text-sm text-purple-600 font-medium">Codeforces • AtCoder • LeetCode • CodeChef</div>
                        </div>

                        <div className="feature-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="contest-card w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">📅</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Contest Calendar</h3>
                            <p className="text-gray-600 mb-4">Never miss a contest again with our integrated calendar and automatic reminders.</p>
                            <div className="text-sm text-blue-600 font-medium">Google Calendar Sync • Reminders</div>
                        </div>

                        <div className="feature-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="practice-card w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">📈</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Practice Analytics</h3>
                            <p className="text-gray-600 mb-4">Deep insights into your practice patterns with phase-based tracking and progress visualization.</p>
                            <div className="text-sm text-green-600 font-medium">30/60/90 Day Phases • Topic Analysis</div>
                        </div>

                        <div className="feature-card bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                            <div className="ai-card w-16 h-16 rounded-xl flex items-center justify-center mb-6">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Insights</h3>
                            <p className="text-gray-600 mb-4">Get personalized recommendations and skill analysis powered by artificial intelligence.</p>
                            <div className="text-sm text-orange-600 font-medium">Skill Radar • Recommendations</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Dashboard Preview Section */}
            <section id="dashboard" className="py-20 bg-green-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-green-accent mb-4">Your Complete Dashboard</h2>
                        <p className="text-xl text-green-100">See all your competitive programming data in one unified interface</p>
                    </div>
                    
                    <div className="bg-green-black rounded-3xl shadow-2xl p-8 overflow-hidden border border-green-900">
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-1">
                                <div className="bg-gradient-to-br from-green-600 to-black rounded-2xl p-6 text-green-100">
                                    <div className="flex items-center space-x-4 mb-4">
                                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                                            <span className="text-2xl font-bold text-green-accent">LM</span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-green-accent">Lucky Malik</h3>
                                            <p className="text-green-100">Competitive Programmer</p>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-green-100">Combined Rating</span>
                                            <span className="font-bold text-green-accent">1,220</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-green-100">Total Solved</span>
                                            <span className="font-bold text-green-accent">580</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-green-100">Current Streak</span>
                                            <span className="font-bold text-green-accent">12 days</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2">
                                <h3 className="text-2xl font-bold text-green-accent mb-6">Platform Ratings</h3>
                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="bg-gradient-to-r from-green-600 to-black rounded-xl p-4 text-green-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-green-accent">Codeforces</span>
                                            <span className="text-xs bg-green-900 px-2 py-1 rounded text-green-100">Pupil</span>
                                        </div>
                                        <div className="text-2xl font-bold text-green-accent">1,450</div>
                                        <div className="text-xs text-green-100">+25 this month</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-600 to-black rounded-xl p-4 text-green-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-green-accent">AtCoder</span>
                                            <span className="text-xs bg-green-900 px-2 py-1 rounded text-green-100">Green</span>
                                        </div>
                                        <div className="text-2xl font-bold text-green-accent">780</div>
                                        <div className="text-xs text-green-100">+15 this month</div>
                                    </div>
                                    <div className="bg-gradient-to-r from-green-600 to-black rounded-xl p-4 text-green-100">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm font-medium text-green-accent">LeetCode</span>
                                            <span className="text-xs bg-green-900 px-2 py-1 rounded text-green-100">Knight</span>
                                        </div>
                                        <div className="text-2xl font-bold text-green-accent">400</div>
                                        <div className="text-xs text-green-100">Solved</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-8 border-t border-green-900">
                            <div className="flex flex-wrap gap-4">
                                <Link to="/dashboard.html" className="bg-gradient-to-r from-green-600 to-black text-green-100 px-6 py-3 rounded-lg font-medium hover:bg-green-700 hover:text-black transition-colors">
                                    📊 View Full Dashboard
                                </Link>
                                <Link to="/contests.html" className="bg-gradient-to-r from-green-600 to-black text-green-100 px-6 py-3 rounded-lg font-medium hover:bg-green-700 hover:text-black transition-colors">
                                    📅 Browse Contests
                                </Link>
                                <Link to="/practice.html" className="bg-gradient-to-r from-green-600 to-black text-green-100 px-6 py-3 rounded-lg font-medium hover:bg-green-700 hover:text-black transition-colors">
                                    📈 Track Practice
                                </Link>
                                <Link to="/insights.html" className="bg-gradient-to-r from-green-600 to-black text-green-100 px-6 py-3 rounded-lg font-medium hover:bg-green-700 hover:text-black transition-colors">
                                    🤖 AI Insights
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
