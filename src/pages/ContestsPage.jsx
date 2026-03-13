import React, { useState, useEffect } from 'react';
import CPVerseAPI from '../utils/api';

const ContestsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['All', 'Codeforces', 'AtCoder', 'LeetCode', 'CodeChef'];

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CPVerseAPI.getUpcomingContests({ days: 7, limit: 100 });
        if (response && response.objects) {
          setContests(response.objects);
        } else {
          setContests([]);
        }
      } catch (err) {
        console.error("Failed to fetch contests:", err);
        setError("Failed to load upcoming contests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, []);

  // Helper function to map platform host to UI representation
  const getPlatformInfo = (host) => {
    if (host.includes('codeforces.com')) return { id: 'cf', name: 'Codeforces', abbr: 'CF', colorClass: 'red' };
    if (host.includes('atcoder.jp')) return { id: 'ac', name: 'AtCoder', abbr: 'AC', colorClass: 'blue' };
    if (host.includes('leetcode.com')) return { id: 'lc', name: 'LeetCode', abbr: 'LC', colorClass: 'green' };
    if (host.includes('codechef.com')) return { id: 'cc', name: 'CodeChef', abbr: 'CC', colorClass: 'orange' };
    return { id: 'other', name: host, abbr: host.substring(0, 2).toUpperCase(), colorClass: 'gray' };
  };

  const filteredContests = contests.filter(contest => {
    if (activeTab === 'All') return true;
    const info = getPlatformInfo(contest.resource);
    return info.name === activeTab;
  });

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0 && minutes > 0) return `${hours}h ${minutes}m`;
    if (hours > 0) return `${hours}h`;
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

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
          <div className="text-2xl font-bold text-white">
             {loading ? '...' : contests.filter(c => new Date(c.start) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length} Contests
          </div>
        </div>
        <div className="bg-gray-900 rounded-xl p-4 border border-gray-800">
          <div className="text-gray-400 text-sm mb-1">Total Listed</div>
          <div className="text-2xl font-bold text-blue-400">{loading ? '...' : contests.length}</div>
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
                  activeTab === tab ? 'active bg-blue-600 text-white border-blue-500' : 'bg-gray-800 text-gray-400 border-gray-700 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contests */}
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : error ? (
              <div className="bg-red-900/40 border border-red-500 text-red-300 p-4 rounded-xl">
                {error}
              </div>
            ) : filteredContests.length === 0 ? (
              <div className="bg-gray-900 border border-gray-800 text-gray-400 p-8 rounded-xl text-center">
                No upcoming contests found for {activeTab}.
              </div>
            ) : (
              filteredContests.map((contest) => {
                const info = getPlatformInfo(contest.resource);
                return (
                  <div key={contest.id} className="contest-card bg-gray-900 rounded-2xl p-6 border border-gray-800 relative overflow-hidden group hover:border-gray-600 transition-colors">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-${info.colorClass}-900/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110`}></div>
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-white text-lg shadow-lg platform-${info.id}`}>
                          {info.abbr}
                        </div>
                        <div>
                          <a href={contest.href} target="_blank" rel="noopener noreferrer">
                            <h3 className={`text-xl font-bold text-white mb-1 group-hover:text-${info.colorClass}-400 transition-colors`}>
                              {contest.event}
                            </h3>
                          </a>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center">
                              <span className="mr-1">🕒</span> {formatDate(contest.start)}
                            </span>
                            <span className="flex items-center">
                              <span className="mr-1">⏱️</span> {formatDuration(contest.duration)}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center space-x-3">
                        <a 
                          href={contest.href} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className={`bg-${info.colorClass}-900/40 text-${info.colorClass}-400 border border-${info.colorClass}-900/50 px-4 py-2 rounded-lg text-sm font-medium hover:bg-${info.colorClass}-900/60 transition-colors`}
                        >
                          Register
                        </a>
                        <button className="bg-gray-800 text-gray-300 border border-gray-700 px-3 py-2 rounded-lg text-sm hover:text-white hover:border-gray-500 transition-colors">
                          ➕ Add
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar - Mini Calendar */}
        <div className="lg:w-1/3">
          <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 shadow-lg sticky top-24">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center justify-between">
              <span>Calendar</span>
              <span className="text-sm font-normal text-gray-400">Current Month</span>
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
