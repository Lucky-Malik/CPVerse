import React, { useState, useEffect } from 'react';

const friends = [
    { initials: 'LM', name: 'Lucky Malik', rating: 1220, rank: '#4', isYou: true, online: true, cf: 1450, lc: 400, cc: 1200 },
    { initials: 'AS', name: 'Arjun Sharma', rating: 1450, rank: '#2', isYou: false, online: true, cf: 1650, lc: 520, cc: 1380 },
    { initials: 'PK', name: 'Priya Kapoor', rating: 1380, rank: '#3', isYou: false, online: false, cf: 1520, lc: 480, cc: 1300 },
    { initials: 'RV', name: 'Rahul Verma', rating: 1180, rank: '#5', isYou: false, online: true, cf: 1320, lc: 380, cc: 1100 },
];

const leaderboard = [
    { initials: 'AS', name: 'Arjun Sharma', rating: 1450 },
    { initials: 'PK', name: 'Priya Kapoor', rating: 1380 },
    { initials: 'LM', name: 'Lucky Malik', rating: 1220, isYou: true },
    { initials: 'RV', name: 'Rahul Verma', rating: 1180 },
    { initials: 'NK', name: 'Neha Kapoor', rating: 1150 },
];

const FriendsPage = () => {
    const [friendInput, setFriendInput] = useState('');
    const [notification, setNotification] = useState(null);

    const addFriend = () => {
        const username = friendInput.trim();
        if (username) {
            setNotification(`Request sent to ${username}`);
            setFriendInput('');
        } else {
            setNotification('Please enter a username');
        }
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        const renderChart = () => {
            if (window.Plotly) {
                const data = [
                    { x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], y: [1200, 1250, 1300, 1280, 1350, 1450], name: 'Arjun', type: 'scatter', mode: 'lines', line: { color: '#64b5f6', width: 2 } },
                    { x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], y: [1150, 1200, 1250, 1300, 1320, 1380], name: 'Priya', type: 'scatter', mode: 'lines', line: { color: '#4db6ac', width: 2 } },
                    { x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], y: [1100, 1150, 1180, 1200, 1190, 1220], name: 'You', type: 'scatter', mode: 'lines', line: { color: '#a5a5a5', width: 2 } },
                    { x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], y: [1050, 1080, 1120, 1150, 1170, 1180], name: 'Rahul', type: 'scatter', mode: 'lines', line: { color: '#ffb74d', width: 2 } },
                ];
                const layout = {
                    xaxis: { color: '#4b5563', gridcolor: '#1f2937', zeroline: false },
                    yaxis: { color: '#4b5563', gridcolor: '#1f2937', zeroline: false },
                    showlegend: true,
                    legend: { x: 0, y: 1, font: { color: '#9ca3af', size: 10 } },
                    margin: { t: 10, r: 10, b: 40, l: 50 },
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: '#9ca3af', size: 11 },
                };
                setTimeout(() => {
                    const el = document.getElementById('ratingComparisonChart');
                    if (el) window.Plotly.newPlot('ratingComparisonChart', data, layout, { responsive: true, displayModeBar: false });
                }, 100);
            }
        };
        renderChart();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 animate-fade-in">
            {/* Toast */}
            {notification && (
                <div className="fixed top-6 right-4 z-50 px-5 py-2.5 rounded-lg text-sm bg-gray-800 border border-gray-700 text-gray-200 shadow-xl">
                    {notification}
                </div>
            )}

            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Friends</h1>
                <p className="text-gray-500 text-sm">Compare progress and climb the leaderboard</p>
            </div>

            {/* Add friend */}
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-6">
                <div className="text-sm font-medium text-gray-400 mb-3">Add Friend</div>
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Enter username..."
                        value={friendInput}
                        onChange={e => setFriendInput(e.target.value)}
                        onKeyPress={e => e.key === 'Enter' && addFriend()}
                        className="flex-1 bg-[#080a0e] border border-gray-800 text-gray-300 text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-700 transition-colors"
                    />
                    <button
                        onClick={addFriend}
                        className="px-4 py-2 rounded-lg border border-gray-700 text-gray-300 text-sm hover:border-gray-500 hover:text-white transition-colors"
                    >
                        Add
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Friends list */}
                <div className="lg:col-span-2 space-y-2">
                    <div className="text-sm font-medium text-gray-500 mb-3">Your Friends ({friends.length})</div>
                    {friends.map(f => (
                        <div
                            key={f.name}
                            className={`bg-[#0f1117] border rounded-xl p-4 transition-colors ${f.isYou ? 'border-gray-700' : 'border-gray-800 hover:border-gray-700'}`}
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-semibold text-gray-300">
                                        {f.initials}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-200">{f.name}</span>
                                            {f.isYou && <span className="text-xs text-gray-600 border border-gray-800 px-1.5 py-0.5 rounded">You</span>}
                                            {!f.isYou && (
                                                <span className={`text-xs px-1.5 py-0.5 rounded ${f.online ? 'text-emerald-600' : 'text-gray-700'}`}>
                                                    {f.online ? 'online' : 'offline'}
                                                </span>
                                            )}
                                        </div>
                                        <div className="text-xs text-gray-600">Combined {f.rating}</div>
                                    </div>
                                </div>
                                <div className="text-sm font-semibold text-gray-500">{f.rank}</div>
                            </div>
                            <div className="grid grid-cols-3 gap-3 mt-3 pt-3 border-t border-gray-800">
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-300">{f.cf}</div>
                                    <div className="text-xs text-gray-600">Codeforces</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-300">{f.lc}</div>
                                    <div className="text-xs text-gray-600">LeetCode</div>
                                </div>
                                <div className="text-center">
                                    <div className="text-sm font-medium text-gray-300">{f.cc}</div>
                                    <div className="text-xs text-gray-600">CodeChef</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                    {/* Leaderboard */}
                    <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                        <div className="text-sm font-medium text-gray-400 mb-4">Leaderboard</div>
                        <div className="space-y-2">
                            {leaderboard.map((l, i) => (
                                <div key={l.name} className={`flex items-center gap-3 p-2 rounded-lg ${l.isYou ? 'bg-gray-800/40' : ''}`}>
                                    <div className="w-6 text-xs text-gray-600 font-mono text-center">{i + 1}</div>
                                    <div className="w-7 h-7 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-xs font-medium text-gray-400">
                                        {l.initials}
                                    </div>
                                    <div className="flex-1">
                                        <div className={`text-sm ${l.isYou ? 'text-gray-200' : 'text-gray-400'}`}>{l.name}</div>
                                    </div>
                                    <div className="text-xs text-gray-600 font-mono">{l.rating}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Rating trends */}
                    <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                        <div className="text-sm font-medium text-gray-400 mb-3">Rating Trends</div>
                        <div id="ratingComparisonChart" style={{ height: '180px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;
