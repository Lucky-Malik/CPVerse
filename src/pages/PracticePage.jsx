import React, { useState } from 'react';

const PracticePage = () => {
  const [activeTab, setActiveTab] = useState('All Topics');

  const tabs = ['All Topics', 'Dynamic Programming', 'Graphs', 'Math', 'Greedy'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative z-10">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Practice Arena</h1>
            <p className="text-gray-400">Sharpen your skills with curated problems</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">Problems Solved</div>
                <div className="text-2xl font-bold text-white">342</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">Current Streak</div>
                <div className="text-2xl font-bold text-orange-500">12 Days 🔥</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">Global Rank (Practice)</div>
                <div className="text-2xl font-bold text-green-400">Top 15%</div>
            </div>
            <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
                <div className="text-gray-400 text-sm mb-1">XP Points</div>
                <div className="text-2xl font-bold text-purple-400">12,450</div>
            </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content - Problems List */}
            <div className="lg:w-3/4">
                {/* Search & Filters */}
                <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:w-1/2">
                        <input 
                            type="text" 
                            placeholder="Search problems..." 
                            className="w-full bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-green-500 transition-colors"
                        />
                        <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
                    </div>
                    <div className="flex space-x-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
                        <select className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-green-500">
                            <option>Difficulty</option>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                        <select className="bg-gray-800 border border-gray-700 text-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:border-green-500">
                            <option>Status</option>
                            <option>Unsolved</option>
                            <option>Solved</option>
                            <option>Attempted</option>
                        </select>
                    </div>
                </div>

                {/* Topic Tabs */}
                <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
                    {tabs.map(tab => (
                        <button 
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`filter-btn px-4 py-2 text-sm rounded-lg whitespace-nowrap transition-all ${activeTab === tab ? 'active' : ''}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Problem List */}
                <div className="space-y-3">
                    {/* Problem 1 */}
                    <div className="problem-card bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-green-900/50 flex items-center justify-center text-green-500 border border-green-800">
                                ✅
                            </div>
                            <div>
                                <h4 className="text-lg text-white font-medium hover:text-green-400 cursor-pointer transition-colors">Two Sum</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="difficulty-badge diff-easy">Easy</span>
                                    <span className="topic-tag">Array</span>
                                    <span className="topic-tag">Hash Table</span>
                                    <span className="text-xs text-gray-500">LeetCode</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <button className="text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm transition-colors border border-gray-700">
                                Review Code
                            </button>
                        </div>
                    </div>

                    {/* Problem 2 */}
                    <div className="problem-card bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 border border-gray-700">
                                ➖
                            </div>
                            <div>
                                <h4 className="text-lg text-white font-medium hover:text-green-400 cursor-pointer transition-colors">Longest Increasing Subsequence</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="difficulty-badge diff-medium">Medium</span>
                                    <span className="topic-tag">Dynamic Programming</span>
                                    <span className="topic-tag">Binary Search</span>
                                    <span className="text-xs text-gray-500">Codeforces</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <button className="bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/50 px-4 py-2 rounded-lg text-sm transition-colors">
                                Solve Now
                            </button>
                        </div>
                    </div>

                    {/* Problem 3 */}
                    <div className="problem-card bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-orange-900/30 flex items-center justify-center text-orange-500 border border-orange-800">
                                🔄
                            </div>
                            <div>
                                <h4 className="text-lg text-white font-medium hover:text-green-400 cursor-pointer transition-colors">Dijkstra's Shortest Path</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="difficulty-badge diff-medium">Medium</span>
                                    <span className="topic-tag">Graphs</span>
                                    <span className="topic-tag">Shortest Path</span>
                                    <span className="text-xs text-gray-500">AtCoder</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block text-orange-400 text-sm font-medium">
                            Attempted (WA)
                        </div>
                    </div>
                    
                    {/* Problem 4 */}
                    <div className="problem-card bg-gray-900 rounded-xl p-4 border border-gray-800 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 border border-gray-700">
                                ➖
                            </div>
                            <div>
                                <h4 className="text-lg text-white font-medium hover:text-green-400 cursor-pointer transition-colors">Alien Dictionary</h4>
                                <div className="flex items-center space-x-2 mt-1">
                                    <span className="difficulty-badge diff-hard">Hard</span>
                                    <span className="topic-tag">Graphs</span>
                                    <span className="topic-tag">Topological Sort</span>
                                    <span className="text-xs text-gray-500">LeetCode</span>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block">
                            <button className="bg-green-600/20 text-green-400 hover:bg-green-600/30 border border-green-500/50 px-4 py-2 rounded-lg text-sm transition-colors">
                                Solve Now
                            </button>
                        </div>
                    </div>
                </div>

                {/* Pagination */}
                <div className="mt-8 flex justify-center">
                    <nav className="flex space-x-2">
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors">Prev</button>
                        <button className="px-3 py-1 bg-green-600 text-black font-bold rounded-lg border border-green-500">1</button>
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors">2</button>
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors">3</button>
                        <span className="px-3 py-1 text-gray-500">...</span>
                        <button className="px-3 py-1 bg-gray-800 border border-gray-700 text-gray-400 rounded-lg hover:text-white hover:border-gray-500 transition-colors">Next</button>
                    </nav>
                </div>
            </div>

            {/* Sidebar - Recommendations */}
            <div className="lg:w-1/4 space-y-6">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-green-900/20 rounded-bl-full -z-10 transition-transform group-hover:scale-150 relative" style={{position: 'absolute'}}></div>
                    <h3 className="text-lg font-bold text-white mb-4">🎯 Daily Target</h3>
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Easy (1/2)</span>
                            <span className="text-green-400">50%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div className="bg-green-500 h-1.5 rounded-full" style={{width: '50%'}}></div>
                        </div>
                    </div>
                    <div className="space-y-3 mb-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Medium (0/2)</span>
                            <span className="text-yellow-500">0%</span>
                        </div>
                        <div className="w-full bg-gray-800 rounded-full h-1.5">
                            <div className="bg-yellow-500 h-1.5 rounded-full" style={{width: '0%'}}></div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 shadow-lg">
                    <h3 className="text-lg font-bold text-white mb-4">🤖 AI Suggestion</h3>
                    <p className="text-sm text-gray-400 mb-4">
                        Based on your recent struggles with Graph algorithms in contests, we recommend solving "Alien Dictionary".
                    </p>
                    <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-black font-bold py-2 rounded-lg hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                        Solve Suggestion
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default PracticePage;
