import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffect from '../components/BackgroundEffect';
import Plotly from 'plotly.js-dist-min';

const DashboardPage = () => {
    useEffect(() => {
        const ratingData = [
            {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                y: [1200, 1220, 1180, 1250, 1300, 1280, 1350, 1400, 1420, 1450],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'Codeforces',
                line: { color: '#e57373', width: 2 },
                marker: { size: 5, color: '#e57373' }
            },
            {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                y: [600, 620, 650, 680, 700, 720, 740, 760, 770, 780],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'AtCoder',
                line: { color: '#64b5f6', width: 2 },
                marker: { size: 5, color: '#64b5f6' }
            }
        ];

        const layout = {
            xaxis: { color: '#4b5563', gridcolor: '#1f2937', zeroline: false },
            yaxis: { color: '#4b5563', gridcolor: '#1f2937', zeroline: false },
            showlegend: true,
            legend: { x: 0, y: 1, font: { color: '#9ca3af', size: 11 } },
            margin: { t: 10, r: 10, b: 40, l: 50 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#9ca3af', size: 11 },
        };

        Plotly.newPlot('ratingChart', ratingData, layout, { responsive: true, displayModeBar: false });
    }, []);

    const platforms = [
        { name: 'Codeforces', rank: 'Pupil', rating: '1,450', delta: '+25 this month', progress: 58, color: '#e57373' },
        { name: 'AtCoder', rank: 'Green', rating: '780', delta: '+15 this month', progress: 78, color: '#64b5f6' },
        { name: 'LeetCode', rank: 'Knight', rating: '400', delta: 'Problems solved', progress: 80, color: '#ffb74d' },
    ];

    const recentActivity = [
        { label: 'Solved "Tree Queries" on Codeforces', sub: 'Rating: 1800 · 2 hours ago', delta: '+12' },
        { label: 'Participated in AtCoder ABC 350', sub: 'Rank: 156/2500 · 1 day ago', delta: '+15' },
        { label: 'Completed daily LeetCode challenge', sub: '"Maximum Subarray" · 2 days ago', delta: '+Streak' },
    ];

    const quickLinks = [
        { to: '/contests.html', label: 'Contests', sub: 'Upcoming competitions' },
        { to: '/practice.html', label: 'Practice', sub: 'Review submissions' },
        { to: '/insights.html', label: 'Insights', sub: 'Personalized tips' },
        { to: '/friends.html', label: 'Friends', sub: 'Leaderboards' },
    ];

    return (
        <div className="relative pt-14">
            <BackgroundEffect type="net" id="particle-bg" className="particle-bg" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Welcome back, Lucky</h1>
                    <p className="text-gray-500 text-sm">Here's your competitive programming overview</p>
                </div>

                {/* Profile card */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-300">LM</div>
                        <div>
                            <div className="text-base font-medium text-white">Lucky Malik</div>
                            <div className="text-xs text-gray-500">Competitive Programmer · Member since Jan 2023</div>
                            <div className="flex gap-2 mt-1">
                                <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">12 day streak</span>
                                <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">Active</span>
                            </div>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-3xl font-semibold text-gray-200">1,220</div>
                        <div className="text-xs text-gray-500 mt-0.5">Combined Rating</div>
                    </div>
                </div>

                {/* Platform ratings */}
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                    {platforms.map(p => (
                        <div key={p.name} className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-sm font-medium text-gray-300">{p.name}</span>
                                <span className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">{p.rank}</span>
                            </div>
                            <div className="text-2xl font-semibold text-gray-200 mb-1">{p.rating}</div>
                            <div className="text-xs text-gray-600 mb-3">{p.delta}</div>
                            <div className="h-1 w-full bg-gray-800 rounded-full overflow-hidden">
                                <div
                                    className="h-1 rounded-full"
                                    style={{ width: `${p.progress}%`, backgroundColor: p.color, opacity: 0.7 }}
                                />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats + Chart */}
                <div className="grid lg:grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                        <div className="text-sm font-medium text-gray-400 mb-4">Problem Statistics</div>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Total Solved', value: '580', sub: '+42 this month' },
                                { label: 'Accuracy Rate', value: '78%', sub: '+2% improvement' },
                                { label: 'Current Streak', value: '12', sub: 'Best: 28 days' },
                                { label: 'Avg Rating', value: '1,650', sub: '+50 this phase' },
                            ].map(s => (
                                <div key={s.label} className="border border-gray-800 rounded-lg p-3">
                                    <div className="text-xs text-gray-500 mb-1">{s.label}</div>
                                    <div className="text-xl font-semibold text-gray-200">{s.value}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">{s.sub}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                        <div className="text-sm font-medium text-gray-400 mb-4">Rating Progress</div>
                        <div id="ratingChart" style={{ height: '200px' }} />
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-6">
                    <div className="text-sm font-medium text-gray-400 mb-4">Recent Activity</div>
                    <div className="space-y-2">
                        {recentActivity.map((a, i) => (
                            <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-800/60 last:border-0">
                                <div>
                                    <div className="text-sm text-gray-300">{a.label}</div>
                                    <div className="text-xs text-gray-600 mt-0.5">{a.sub}</div>
                                </div>
                                <span className="text-xs text-gray-500 font-medium">{a.delta}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick actions */}
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-4">Quick Access</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {quickLinks.map(l => (
                            <Link
                                key={l.to}
                                to={l.to}
                                className="border border-gray-800 rounded-lg p-4 hover:border-gray-600 hover:bg-gray-800/30 transition-all group"
                            >
                                <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{l.label}</div>
                                <div className="text-xs text-gray-600 mt-1">{l.sub}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
