import React, { useState, useEffect } from 'react';
import CPVerseAPI from '../utils/api';

const ContestsPage = () => {
  const [activeTab, setActiveTab] = useState('All');
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const tabs = ['All', 'Codeforces', 'LeetCode', 'CodeChef'];

  useEffect(() => {
    const fetchContests = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await CPVerseAPI.getUpcomingContests({ days: 14, limit: 100 });
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

  // Platform config — muted accent colors only
  const getPlatformInfo = (host) => {
    if (host.includes('codeforces.com')) return { id: 'cf', name: 'Codeforces', abbr: 'CF', accent: '#c0392b', textColor: '#e57373', borderColor: 'rgba(192,57,43,0.3)' };
    if (host.includes('atcoder.jp'))    return { id: 'ac', name: 'AtCoder',    abbr: 'AC', accent: '#1a6fa8', textColor: '#64b5f6', borderColor: 'rgba(26,111,168,0.3)' };
    if (host.includes('leetcode.com'))  return { id: 'lc', name: 'LeetCode',   abbr: 'LC', accent: '#b8862b', textColor: '#ffb74d', borderColor: 'rgba(184,134,43,0.3)' };
    if (host.includes('codechef.com'))  return { id: 'cc', name: 'CodeChef',   abbr: 'CC', accent: '#5d4037', textColor: '#a1887f', borderColor: 'rgba(93,64,55,0.3)' };
    return { id: 'other', name: host, abbr: host.substring(0, 2).toUpperCase(), accent: '#444', textColor: '#aaa', borderColor: 'rgba(68,68,68,0.3)' };
  };

  const SUPPORTED_PLATFORMS = ['Codeforces', 'LeetCode', 'CodeChef'];

  const filteredContests = contests.filter(contest => {
    const info = getPlatformInfo(contest.resource);
    if (!SUPPORTED_PLATFORMS.includes(info.name)) return false;
    if (activeTab === 'All') return true;
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

  const thisWeekCount = loading
    ? null
    : filteredContests.filter(c => new Date(c.start) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in relative z-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Upcoming Contests</h1>
        <p className="text-gray-500 text-sm">Live data from CLIST &mdash; Codeforces, AtCoder, LeetCode, CodeChef</p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'This Week',    value: loading ? '—' : `${thisWeekCount}` },
          { label: 'Total Fetched', value: loading ? '—' : `${filteredContests.length}` },
          { label: 'Target Rating', value: '1400' },
          { label: 'Avg Delta',     value: '+45' },
        ].map(stat => (
          <div key={stat.label} className="bg-[#0f1117] border border-gray-800 rounded-xl px-4 py-3">
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{stat.label}</div>
            <div className="text-xl font-medium text-gray-200">{stat.value}</div>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">

        {/* Main */}
        <div className="lg:w-2/3">

          {/* Tab filters */}
          <div className="flex space-x-2 mb-5 overflow-x-auto pb-1">
            {tabs.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all whitespace-nowrap border ${
                  activeTab === tab
                    ? 'bg-gray-700 text-white border-gray-600'
                    : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300 hover:border-gray-600'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Contest list */}
          <div className="space-y-3">
            {loading ? (
              <div className="flex justify-center py-16">
                <div className="w-6 h-6 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin"></div>
              </div>
            ) : error ? (
              <div className="border border-red-900 text-red-400 bg-red-950/30 p-4 rounded-lg text-sm">
                {error}
              </div>
            ) : filteredContests.length === 0 ? (
              <div className="text-gray-600 text-sm py-12 text-center border border-gray-800 rounded-xl">
                No upcoming contests found for <span className="text-gray-400">{activeTab}</span>.
              </div>
            ) : (
              filteredContests.map(contest => {
                const info = getPlatformInfo(contest.resource);
                return (
                  <div
                    key={contest.id}
                    className="bg-[#0f1117] border border-gray-800 rounded-xl px-5 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gray-600 transition-colors group"
                  >
                    {/* Left */}
                    <div className="flex items-center gap-4">
                      {/* Platform badge */}
                      <div
                        className="w-9 h-9 rounded-md flex items-center justify-center text-xs font-bold flex-shrink-0"
                        style={{ backgroundColor: info.accent + '22', color: info.textColor, border: `1px solid ${info.borderColor}` }}
                      >
                        {info.abbr}
                      </div>

                      {/* Contest info */}
                      <div>
                        <a href={contest.href} target="_blank" rel="noopener noreferrer">
                          <div
                            className="text-sm font-medium text-gray-200 group-hover:text-white transition-colors leading-snug"
                          >
                            {contest.event}
                          </div>
                        </a>
                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                          <span>{formatDate(contest.start)}</span>
                          <span className="text-gray-700">·</span>
                          <span>{formatDuration(contest.duration)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex items-center gap-2 md:flex-shrink-0">
                      <a
                        href={contest.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-700 text-gray-300 hover:border-gray-500 hover:text-white transition-colors"
                      >
                        Register
                      </a>
                      <button className="px-3 py-1.5 rounded-md text-xs font-medium border border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300 transition-colors">
                        + Save
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 sticky top-24">
            <div className="text-sm font-medium text-gray-300 mb-4">Saved Contests</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-gray-300">Codeforces Round 918</span>
                <span className="text-gray-500">Tomorrow</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2.5 bg-gray-900 rounded-lg border border-gray-800">
                <span className="text-gray-300">AtCoder Beginner 335</span>
                <span className="text-gray-500">Sat</span>
              </div>
            </div>

            <div className="mt-6 border-t border-gray-800 pt-4">
              <div className="text-sm font-medium text-gray-300 mb-3">Platform breakdown</div>
              {SUPPORTED_PLATFORMS.map(platform => {
                const count = contests.filter(c => getPlatformInfo(c.resource).name === platform).length;
                const info = getPlatformInfo(platform === 'Codeforces' ? 'codeforces.com' : platform === 'AtCoder' ? 'atcoder.jp' : platform === 'LeetCode' ? 'leetcode.com' : 'codechef.com');
                return (
                  <div key={platform} className="flex items-center justify-between text-xs text-gray-500 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: info.textColor }}></div>
                      <span>{platform}</span>
                    </div>
                    <span className="text-gray-400">{loading ? '—' : count}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContestsPage;
