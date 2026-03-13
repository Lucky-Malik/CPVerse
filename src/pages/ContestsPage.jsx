import React, { useState } from 'react';

const ContestsPage = () => {
  const [activeTab, setActiveTab] = useState('All');

  const tabs = ['All', 'Codeforces', 'AtCoder', 'LeetCode'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in relative z-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Upcoming Contests</h1>
          <p className="text-gray-400">Plan your competitive programming schedule</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-4">
          <button className="bg-gray-800 text-white px-4 py-2 rounded-lg font-medium border border-gray-700 hover:border-gray-500 transition-colors">
            📅 Subscriptions
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">This Week</div>
          <div className="text-2xl font-bold text-white">4 Contests</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Next Codeforces</div>
          <div className="text-2xl font-bold text-red-400">In 2 Days</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Target Rating</div>
          <div className="text-2xl font-bold text-green-400">1400</div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Win Rate</div>
          <div className="text-2xl font-bold text-blue-400">+45 Avg Δ</div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content - Contest List */}
        <div className="lg:w-2/3">
          {/* Filters */}
          <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`filter-btn px-4 py-2 rounded-lg text-sm transition-all whitespace-nowrap ${
                  activeTab === tab ? 'active' : ''
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contests */}
          <div className="space-y-4">
            {/* Contest Card 1 */}
            <div className="contest-card bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-900/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg platform-cf">
                    CF
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-red-400 transition-colors">
                      Codeforces Round 918 (Div. 2)
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="mr-1">🕒</span> 23:35, Tomorrow
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span> 2 hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <button className="bg-red-900/40 text-red-400 border border-red-900/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-900/60 transition-colors">
                    Register
                  </button>
                  <button className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded-lg text-sm hover:text-white hover:border-gray-500 transition-colors">
                    ➕ Add
                  </button>
                </div>
              </div>
            </div>

            {/* Contest Card 2 */}
            <div className="contest-card bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-900/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg platform-ac">
                    AC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                      AtCoder Beginner Contest 335
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="mr-1">🕒</span> 17:30, Sat
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span> 100 mins
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <button className="bg-blue-900/40 text-blue-400 border border-blue-900/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-900/60 transition-colors">
                    Register
                  </button>
                  <button className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded-lg text-sm hover:text-white hover:border-gray-500 transition-colors">
                    ➕ Add
                  </button>
                </div>
              </div>
            </div>

            {/* Contest Card 3 */}
            <div className="contest-card bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-green-900/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg platform-lc">
                    LC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                      Weekly Contest 378
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="mr-1">🕒</span> 08:00, Sun
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span> 1.5 hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <button className="bg-green-900/40 text-green-400 border border-green-900/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-900/60 transition-colors">
                    Register
                  </button>
                  <button className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded-lg text-sm hover:text-white hover:border-gray-500 transition-colors">
                    ➕ Add
                  </button>
                </div>
              </div>
            </div>

            {/* Contest Card 4 */}
            <div className="contest-card bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-900/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110"></div>
              <div className="flex flex-col md:flex-row md:items-center justify-between">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg platform-cc">
                    CC
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      Starters 115 (Div. 2 & 3)
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <span className="mr-1">🕒</span> 20:00, Next Wed
                      </span>
                      <span className="flex items-center">
                        <span className="mr-1">⏱️</span> 2 hours
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 flex items-center space-x-3">
                  <button className="bg-orange-900/40 text-orange-400 border border-orange-900/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-900/60 transition-colors">
                    Register
                  </button>
                  <button className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded-lg text-sm hover:text-white hover:border-gray-500 transition-colors">
                    ➕ Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Mini Calendar */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Calendar</span>
              <span className="text-sm font-normal text-gray-400">January 2024</span>
            </h3>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
              <div>S</div><div>M</div><div>T</div><div>W</div><div>T</div><div>F</div><div>S</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm mb-6">
              {/* Dummy Calendar Days */}
              <div className="p-2 text-gray-600">31</div>
              <div className="p-2 text-white">1</div>
              <div className="p-2 text-white calendar-event rounded">2</div>
              <div className="p-2 text-white">3</div>
              <div className="p-2 text-white rounded bg-green-900/40 text-green-400 font-bold border border-green-500/50">4</div>
              <div className="p-2 text-white">5</div>
              <div className="p-2 text-white calendar-event rounded">6</div>
              
              <div className="p-2 text-white calendar-event rounded">7</div>
              <div className="p-2 text-white">8</div>
              <div className="p-2 text-white">9</div>
              <div className="p-2 text-white calendar-event rounded">10</div>
              <div className="p-2 text-white">11</div>
              <div className="p-2 text-white">12</div>
              <div className="p-2 text-white">13</div>
              
              <div className="p-2 text-white">14</div>
              <div className="p-2 text-white">15</div>
              <div className="p-2 text-white">16</div>
              <div className="p-2 text-white">17</div>
              <div className="p-2 text-white">18</div>
              <div className="p-2 text-white">19</div>
              <div className="p-2 text-white">20</div>
            </div>

            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-400 border-b border-gray-800 pb-2">Starred Contests</h4>
              <div className="flex items-center justify-between text-sm p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-green-500/50 transition-colors">
                <span className="text-white">Codeforces Round 918</span>
                <span className="text-red-400 font-medium">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between text-sm p-2 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-blue-500/50 transition-colors">
                <span className="text-white">AtCoder Beginner 335</span>
                <span className="text-blue-400 font-medium">Sat</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestsPage;
