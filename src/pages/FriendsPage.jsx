import React, { useState, useEffect } from 'react';

const FriendsPage = () => {
    const [friendInput, setFriendInput] = useState('');
    const [notification, setNotification] = useState(null);

    const addFriend = () => {
        const username = friendInput.trim();
        if (username) {
            showNotification(`Friend request sent to ${username}!`, 'success');
            setFriendInput('');
        } else {
            showNotification('Please enter a username', 'error');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') addFriend();
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    useEffect(() => {
        const renderChart = () => {
            if (window.Plotly) {
                const comparisonData = [
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        y: [1200, 1250, 1300, 1280, 1350, 1450],
                        name: 'Arjun',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#3b82f6', width: 3 },
                        marker: { size: 6 }
                    },
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        y: [1150, 1200, 1250, 1300, 1320, 1380],
                        name: 'Priya',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#2dd4bf', width: 3 },
                        marker: { size: 6 }
                    },
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        y: [1100, 1150, 1180, 1200, 1190, 1220],
                        name: 'You',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#10b981', width: 4 },
                        marker: { size: 10, color: '#10b981', line: { color: '#ffffff', width: 1 } }
                    },
                    {
                        x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                        y: [1050, 1080, 1120, 1150, 1170, 1180],
                        name: 'Rahul',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#f59e0b', width: 3 },
                        marker: { size: 6 }
                    }
                ];

                const comparisonLayout = {
                    xaxis: { 
                        title: 'Month',
                        gridcolor: '#374151',
                        tickfont: { color: '#9ca3af' },
                        titlefont: { color: '#d1d5db' }
                    },
                    yaxis: { 
                        title: 'Combined Rating',
                        gridcolor: '#374151',
                        tickfont: { color: '#9ca3af' },
                        titlefont: { color: '#d1d5db' }
                    },
                    showlegend: true,
                    legend: { x: 0, y: 1, font: { color: '#e5e7eb' } },
                    margin: { t: 20, r: 20, b: 50, l: 50 },
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    paper_bgcolor: 'rgba(0,0,0,0)'
                };

                setTimeout(() => {
                    const el = document.getElementById('ratingComparisonChart');
                    if(el) window.Plotly.newPlot('ratingComparisonChart', comparisonData, comparisonLayout, { responsive: true, displayModeBar: false });
                }, 100);
            }
        };

        renderChart();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fade-in">
            {notification && (
                <div className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-2xl transition-all duration-300 flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-600 text-black font-bold' : 'bg-red-600 text-white'}`}>
                    {notification.message}
                </div>
            )}

            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white mb-2">Friends & Leaderboard</h1>
                <p className="text-gray-400">Compare your progress with friends and climb the rankings</p>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">Add Friend</h3>
                <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
                    <input 
                        type="text" 
                        placeholder="Enter username or email..." 
                        className="add-friend-input flex-1 px-4 py-3 border border-gray-700 rounded-lg focus:outline-none w-full"
                        value={friendInput}
                        onChange={(e) => setFriendInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button 
                        className="bg-green-600 text-black px-6 py-3 rounded-lg font-bold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all w-full sm:w-auto"
                        onClick={addFriend}
                    >
                        👥 Add Friend
                    </button>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                    Tip: You can add friends by their CPVerse username or email address
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-xl font-bold text-white">Your Friends</h3>
                            <div className="text-sm text-gray-400">12 friends</div>
                        </div>
                        
                        <div className="space-y-4">
                            {/* Friend 1 */}
                            <div className="friend-card bg-green-900/20 rounded-xl p-4 border border-green-500/50">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-700 rounded-full flex items-center justify-center text-black font-bold shadow-[0_0_10px_rgba(16,185,129,0.4)]">
                                        LM
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-bold text-white">Lucky Malik</h4>
                                            <span className="bg-green-500/20 text-green-400 border border-green-500/30 px-2 py-1 rounded-full text-xs font-medium">You</span>
                                        </div>
                                        <div className="text-sm text-gray-400">Combined Rating: 1,220</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-green-500">#4</div>
                                        <div className="text-xs text-gray-500">Global Rank</div>
                                    </div>
                                </div>
                            </div>

                            {/* Friend 2 */}
                            <div className="friend-card bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-blue-500">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                                        AS
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-bold text-white">Arjun Sharma</h4>
                                            <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-900">Online</span>
                                        </div>
                                        <div className="text-sm text-gray-400">Combined Rating: 1,450</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-500">#2</div>
                                        <div className="text-xs text-gray-500">Global Rank</div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div className="text-center">
                                            <div className="font-bold text-white">1,650</div>
                                            <div className="text-gray-500">Codeforces</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-blue-400">920</div>
                                            <div className="text-gray-500">AtCoder</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-green-400">520</div>
                                            <div className="text-gray-500">LeetCode</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Friend 3 */}
                            <div className="friend-card bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-teal-500">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-black font-bold shadow-lg">
                                        PK
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-bold text-white">Priya Kapoor</h4>
                                            <span className="bg-gray-700 text-gray-400 px-2 py-1 rounded-full text-xs font-medium">Offline</span>
                                        </div>
                                        <div className="text-sm text-gray-400">Combined Rating: 1,380</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-teal-400">#3</div>
                                        <div className="text-xs text-gray-500">Global Rank</div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div className="text-center">
                                            <div className="font-bold text-white">1,520</div>
                                            <div className="text-gray-500">Codeforces</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-blue-400">850</div>
                                            <div className="text-gray-500">AtCoder</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-green-400">480</div>
                                            <div className="text-gray-500">LeetCode</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Friend 4 */}
                            <div className="friend-card bg-gray-800 rounded-xl p-4 border border-gray-700 hover:border-yellow-500">
                                <div className="flex items-center space-x-4">
                                    <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-black font-bold shadow-lg">
                                        RV
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="font-bold text-white">Rahul Verma</h4>
                                            <span className="bg-green-900/30 text-green-400 px-2 py-1 rounded-full text-xs font-medium border border-green-900">Online</span>
                                        </div>
                                        <div className="text-sm text-gray-400">Combined Rating: 1,180</div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-yellow-500">#5</div>
                                        <div className="text-xs text-gray-500">Global Rank</div>
                                    </div>
                                </div>
                                <div className="mt-3 pt-3 border-t border-gray-700">
                                    <div className="grid grid-cols-3 gap-4 text-xs">
                                        <div className="text-center">
                                            <div className="font-bold text-white">1,320</div>
                                            <div className="text-gray-500">Codeforces</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-blue-400">720</div>
                                            <div className="text-gray-500">AtCoder</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="font-bold text-green-400">380</div>
                                            <div className="text-gray-500">LeetCode</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-1 space-y-8">
                    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">Global Leaderboard</h3>
                        <div className="space-y-1">
                            <div className="leaderboard-row flex items-center space-x-3 p-3 rounded-lg">
                                <div className="rank-badge-gold w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">1</div>
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xs">AS</div>
                                <div className="flex-1">
                                    <div className="font-medium text-white text-sm">Arjun Sharma</div>
                                    <div className="text-xs text-gray-500">1,450 rating</div>
                                </div>
                            </div>

                            <div className="leaderboard-row flex items-center space-x-3 p-3 rounded-lg">
                                <div className="rank-badge-silver w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">2</div>
                                <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center text-black font-bold text-xs">PK</div>
                                <div className="flex-1">
                                    <div className="font-medium text-white text-sm">Priya Kapoor</div>
                                    <div className="text-xs text-gray-500">1,380 rating</div>
                                </div>
                            </div>

                            <div className="leaderboard-row flex items-center space-x-3 p-3 rounded-lg">
                                <div className="rank-badge-bronze w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md">3</div>
                                <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-black font-bold text-xs">LM</div>
                                <div className="flex-1">
                                    <div className="font-medium text-green-400 text-sm">Lucky Malik</div>
                                    <div className="text-xs text-gray-500">1,220 rating</div>
                                </div>
                            </div>

                            <div className="leaderboard-row flex items-center space-x-3 p-3 rounded-lg">
                                <div className="w-8 h-8 bg-gray-800 border border-gray-700 text-gray-400 rounded-full flex items-center justify-center font-bold text-sm">4</div>
                                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full flex items-center justify-center text-black font-bold text-xs">RV</div>
                                <div className="flex-1">
                                    <div className="font-medium text-white text-sm">Rahul Verma</div>
                                    <div className="text-xs text-gray-500">1,180 rating</div>
                                </div>
                            </div>

                            <div className="leaderboard-row flex items-center space-x-3 p-3 rounded-lg">
                                <div className="w-8 h-8 bg-gray-800 border border-gray-700 text-gray-400 rounded-full flex items-center justify-center font-bold text-sm">5</div>
                                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-bold text-xs">NK</div>
                                <div className="flex-1">
                                    <div className="font-medium text-white text-sm">Neha Kapoor</div>
                                    <div className="text-xs text-gray-500">1,150 rating</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-6">Rating Trends</h3>
                        <div id="ratingComparisonChart" className="chart-container"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FriendsPage;
