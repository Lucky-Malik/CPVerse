import React, { useState, useEffect } from 'react';

const InsightsPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            showNotification('AI insights have been refreshed with latest data!', 'success');
            setTimeout(() => {
                setIsGenerating(false);
            }, 2000);
        }, 3000);
    };

    const showNotification = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification(null);
        }, 3000);
    };

    useEffect(() => {
        const renderCharts = () => {
            if (window.Plotly) {
                // Skill Radar Chart
                const skillData = [{
                    type: 'scatterpolar',
                    r: [85, 72, 68, 60, 78, 75, 82],
                    theta: ['DP', 'Greedy', 'Math', 'Graphs', 'Data Struct', 'Strings', 'Impl.'],
                    fill: 'toself',
                    name: 'Current Skills',
                    line: { color: '#10b981' },
                    fillcolor: 'rgba(16, 185, 129, 0.2)' 
                }];

                const skillLayout = {
                    polar: {
                        bgcolor: 'rgba(0,0,0,0)',
                        radialaxis: {
                            visible: true,
                            range: [0, 100],
                            tickfont: { size: 10, color: '#9ca3af' },
                            gridcolor: '#374151',
                            linecolor: '#374151'
                        },
                        angularaxis: {
                            tickfont: { size: 12, color: '#e5e7eb' },
                            gridcolor: '#374151',
                            linecolor: '#374151'
                        }
                    },
                    showlegend: false,
                    margin: { t: 20, r: 40, b: 20, l: 40 },
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                    font: { color: '#fff' }
                };

                // Performance Trends Chart
                const performanceData = [
                    {
                        x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        y: [65, 72, 78, 85],
                        name: 'DP Skills',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#10b981', width: 3 },
                        marker: { size: 8, color: '#10b981' }
                    },
                    {
                        x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        y: [58, 60, 65, 72],
                        name: 'Graph Skills',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#ef4444', width: 3 },
                        marker: { size: 8, color: '#ef4444' }
                    },
                    {
                        x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
                        y: [70, 75, 80, 82],
                        name: 'Overall',
                        type: 'scatter',
                        mode: 'lines+markers',
                        line: { color: '#9ca3af', width: 2, dash: 'dot' },
                        marker: { size: 6, color: '#9ca3af' }
                    }
                ];

                const performanceLayout = {
                    xaxis: { 
                        title: 'Time Period',
                        gridcolor: '#374151',
                        tickfont: { color: '#9ca3af' },
                        titlefont: { color: '#d1d5db' }
                    },
                    yaxis: { 
                        title: 'Skill Level (%)',
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
                    const radarEl = document.getElementById('skillRadarChart');
                    if (radarEl) window.Plotly.newPlot('skillRadarChart', skillData, skillLayout, { responsive: true, displayModeBar: false });
                    
                    const perfEl = document.getElementById('performanceChart');
                    if(perfEl) window.Plotly.newPlot('performanceChart', performanceData, performanceLayout, { responsive: true, displayModeBar: false });
                }, 100);
            }
        };

        renderCharts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10 animate-fade-in">
            {notification && (
                <div className={`fixed top-24 right-4 z-50 px-6 py-3 rounded-lg shadow-2xl transition-all duration-300 flex items-center gap-2 ${notification.type === 'success' ? 'bg-green-600 text-black font-bold' : 'bg-blue-600 text-white'}`}>
                    {notification.message}
                </div>
            )}

            <div className="mb-8">
                <div className="flex items-center space-x-4 mb-4">
                    <h1 className="text-3xl font-bold text-white">AI Insights</h1>
                    <div className="ai-animation">
                        <span className="text-2xl">🤖</span>
                    </div>
                </div>
                <p className="text-gray-400">Personalized analysis and recommendations powered by artificial intelligence</p>
            </div>

            <div className="bg-gradient-to-r from-green-900 to-emerald-900 rounded-2xl p-8 text-white mb-8 border border-green-800 shadow-[0_0_20px_rgba(16,185,129,0.15)] insight-card">
                <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-3xl border border-green-500/30">
                        🧠
                    </div>
                    <div className="flex-1">
                        <h2 className="text-2xl font-bold mb-4 text-white">AI Analysis Summary</h2>
                        <p className="text-lg text-gray-300 mb-4">
                            Based on your recent 30-day practice data, you've shown strong improvement in dynamic programming and greedy algorithms. 
                            Your accuracy rate has increased by <span className="text-green-400 font-bold">8%</span> compared to the previous phase.
                        </p>
                        <div className="flex flex-wrap gap-3 text-sm">
                            <div className="bg-black/40 border border-green-500/30 px-3 py-1 rounded-full text-green-300">📈 Strong Growth</div>
                            <div className="bg-black/40 border border-green-500/30 px-3 py-1 rounded-full text-green-300">🎯 Focused Practice</div>
                            <div className="bg-black/40 border border-green-500/30 px-3 py-1 rounded-full text-green-300">⚡ Quick Learner</div>
                        </div>
                    </div>
                    <button 
                        className={`bg-white text-green-900 px-6 py-3 rounded-lg font-bold hover:bg-green-100 transition-colors shadow-lg ${isGenerating ? 'opacity-75 cursor-not-allowed' : ''}`}
                        onClick={handleGenerate}
                        disabled={isGenerating}
                    >
                        {isGenerating ? '🔄 Analyzing...' : '🔄 Generate New Insights'}
                    </button>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 insight-card">
                    <h3 className="text-xl font-bold text-white mb-6">Skill Proficiency Radar</h3>
                    <div id="skillRadarChart" className="chart-container"></div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 insight-card">
                    <h3 className="text-xl font-bold text-white mb-6">Skill Breakdown</h3>
                    <div className="space-y-6">
                        <div className="skill-item">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-300">Dynamic Programming</span>
                                <span className="text-green-400 font-bold">85%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div className="skill-bar h-3 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" style={{width: '85%'}}></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Strong understanding of patterns and optimization</div>
                        </div>

                        <div className="skill-item">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-300">Greedy Algorithms</span>
                                <span className="text-blue-400 font-bold">72%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div className="bg-blue-600 h-3 rounded-full" style={{width: '72%'}}></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Good intuition for optimal choices</div>
                        </div>

                        <div className="skill-item">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-300">Mathematics</span>
                                <span className="text-yellow-500 font-bold">68%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div className="bg-yellow-600 h-3 rounded-full" style={{width: '68%'}}></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Solid foundation, room for improvement</div>
                        </div>

                        <div className="skill-item">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-300">Graph Theory</span>
                                <span className="text-red-400 font-bold">60%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div className="bg-red-600 h-3 rounded-full" style={{width: '60%'}}></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Needs more practice with complex algorithms</div>
                        </div>

                        <div className="skill-item">
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-medium text-gray-300">Data Structures</span>
                                <span className="text-teal-400 font-bold">78%</span>
                            </div>
                            <div className="w-full bg-gray-800 rounded-full h-3">
                                <div className="bg-teal-600 h-3 rounded-full" style={{width: '78%'}}></div>
                            </div>
                            <div className="text-sm text-gray-500 mt-1">Good command of advanced structures</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-6">Personalized Recommendations</h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="recommendation-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-red-900/50 border border-red-700 rounded-lg flex items-center justify-center text-white text-lg">
                                📊
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Focus Area</h4>
                                <p className="text-sm text-gray-400">Graph Theory</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Your graph theory skills need improvement. Focus on BFS/DFS applications and shortest path algorithms.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-red-400 font-medium">Priority: High</span>
                            <button className="text-red-400 hover:text-red-300 text-sm font-medium">
                                View Problems →
                            </button>
                        </div>
                    </div>

                    <div className="recommendation-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-blue-900/50 border border-blue-700 rounded-lg flex items-center justify-center text-white text-lg">
                                🎯
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Practice Plan</h4>
                                <p className="text-sm text-gray-400">30-Day Challenge</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Structured practice plan focusing on your weak areas with daily problem recommendations.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-400 font-medium">15 problems/week</span>
                            <button className="text-blue-400 hover:text-blue-300 text-sm font-medium">
                                Start Plan →
                            </button>
                        </div>
                    </div>

                    <div className="recommendation-card rounded-xl p-6">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-green-900/50 border border-green-700 rounded-lg flex items-center justify-center text-white text-lg">
                                🏆
                            </div>
                            <div>
                                <h4 className="font-bold text-white">Contest Strategy</h4>
                                <p className="text-sm text-gray-400">Next Contest</p>
                            </div>
                        </div>
                        <p className="text-gray-400 mb-4">
                            Based on your skill profile, target Codeforces Div. 2 contests for optimal rating growth.
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-green-400 font-medium">Expected: +50</span>
                            <button className="text-green-400 hover:text-green-300 text-sm font-medium">
                                View Schedule →
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 insight-card">
                    <h3 className="text-xl font-bold text-white mb-6">Performance Trends</h3>
                    <div id="performanceChart" className="chart-container"></div>
                </div>

                <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 insight-card">
                    <h3 className="text-xl font-bold text-white mb-6">Learning Velocity</h3>
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-green-900/20 border border-green-800 rounded-lg flex items-center justify-center">
                                <span className="text-green-400 text-xl">📈</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Problem Solving Speed</div>
                                <div className="text-sm text-gray-500">15% faster than last month</div>
                            </div>
                            <div className="text-green-400 font-bold">+15%</div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-blue-900/20 border border-blue-800 rounded-lg flex items-center justify-center">
                                <span className="text-blue-400 text-xl">🎯</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Accuracy Rate</div>
                                <div className="text-sm text-gray-500">78% - Above average</div>
                            </div>
                            <div className="text-blue-400 font-bold">78%</div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-teal-900/20 border border-teal-800 rounded-lg flex items-center justify-center">
                                <span className="text-teal-400 text-xl">⚡</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Concept Mastery</div>
                                <div className="text-sm text-gray-500">Rapid improvement in DP</div>
                            </div>
                            <div className="text-teal-400 font-bold">Fast</div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-orange-900/20 border border-orange-800 rounded-lg flex items-center justify-center">
                                <span className="text-orange-500 text-xl">🔥</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Consistency</div>
                                <div className="text-sm text-gray-500">12-day active streak</div>
                            </div>
                            <div className="text-orange-500 font-bold">High</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-800 insight-card">
                <h3 className="text-xl font-bold text-white mb-6">Weekly Goals</h3>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Solve 5 graph theory problems</span>
                            <span className="text-green-400 text-sm">(3/5)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Participate in 2 contests</span>
                            <span className="text-green-400 text-sm">(2/2)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Master segment trees</span>
                            <span className="text-gray-600 text-sm">(0/1)</span>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" defaultChecked className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Review 10 previous problems</span>
                            <span className="text-green-400 text-sm">(8/10)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Complete daily challenges</span>
                            <span className="text-gray-600 text-sm">(4/7)</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <input type="checkbox" className="w-5 h-5 rounded bg-gray-800 border-gray-600" />
                            <span className="text-gray-300">Write editorial for one problem</span>
                            <span className="text-gray-600 text-sm">(0/1)</span>
                        </div>
                    </div>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            Progress: <span className="font-bold text-green-400">58%</span> complete
                        </div>
                        <button className="bg-green-600 text-black px-4 py-2 rounded-lg font-bold hover:bg-green-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
                            Update Goals
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;
