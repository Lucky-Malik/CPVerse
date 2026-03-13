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
                line: { color: '#ef4444', width: 4 },
                marker: { size: 10, color: '#ef4444' }
            },
            {
                x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                y: [600, 620, 650, 680, 700, 720, 740, 760, 770, 780],
                type: 'scatter',
                mode: 'lines+markers',
                name: 'AtCoder',
                line: { color: '#3b82f6', width: 4 },
                marker: { size: 10, color: '#3b82f6' }
            }
        ];

        const layout = {
            title: '',
            xaxis: { 
                title: 'Month',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            yaxis: { 
                title: 'Rating',
                color: '#94a3b8',
                gridcolor: '#334155'
            },
            showlegend: true,
            legend: { 
                x: 0, 
                y: 1,
                font: { color: '#e2e8f0' }
            },
            margin: { t: 20, r: 20, b: 50, l: 50 },
            plot_bgcolor: 'rgba(0,0,0,0)',
            paper_bgcolor: 'rgba(0,0,0,0)',
            font: { color: '#e2e8f0' }
        };

        Plotly.newPlot('ratingChart', ratingData, layout, { responsive: true });

        // Animate elements
        const cards = document.querySelectorAll('.rating-card, .glass-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) rotateX(-10deg)';
            card.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) rotateX(0deg)';
            }, index * 150);
        });

        setTimeout(() => {
            const progressBars = document.querySelectorAll('.progress-inner');
            progressBars.forEach(bar => {
                const width = bar.dataset.width;
                if(width) {
                    bar.style.width = '0%';
                    setTimeout(() => {
                        bar.style.transition = 'width 2s cubic-bezier(0.4, 0, 0.2, 1)';
                        bar.style.width = width;
                    }, 500);
                }
            });
        }, 1000);

        const handleMouseMove = (e) => {
            const currentCards = document.querySelectorAll('.rating-card');
            
            currentCards.forEach(card => {
                const rect = card.getBoundingClientRect();
                const cardX = (e.clientX - rect.left - rect.width / 2) / rect.width;
                const cardY = (e.clientY - rect.top - rect.height / 2) / rect.height;
                
                card.style.transform = `perspective(1000px) rotateY(${cardX * 10}deg) rotateX(${-cardY * 10}deg) translateZ(10px)`;
            });
        };

        document.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <div className="relative pt-16">
            <BackgroundEffect type="net" id="particle-bg" className="particle-bg" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
                <div className="mb-8 floating-element">
                    <h1 className="text-4xl font-bold neon-text mb-2">Welcome back, Lucky!</h1>
                    <p className="text-slate-400">Here's your competitive programming overview</p>
                </div>

                <div className="glass-card rounded-2xl p-8 mb-8 floating-element opacity-0">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-6">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center floating-element">
                                <span className="text-3xl font-bold text-white">LM</span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold mb-1 text-white">Lucky Malik</h2>
                                <p className="text-slate-400 mb-2">Competitive Programmer • Member since Jan 2023</p>
                                <div className="flex items-center space-x-4 text-sm">
                                    <span className="bg-purple-500/20 px-3 py-1 rounded-full text-purple-300">12 day streak</span>
                                    <span className="bg-green-500/20 px-3 py-1 rounded-full text-green-300">Active</span>
                                </div>
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-4xl font-bold mb-1 neon-text">1,220</div>
                            <div className="text-slate-400">Combined Rating</div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-8">
                    <div className="rating-card glass-card rounded-xl p-6 text-white transform perspective-1000 opacity-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">Codeforces</h3>
                            <span className="text-xs bg-red-500/30 px-2 py-1 rounded">Pupil</span>
                        </div>
                        <div className="text-3xl font-bold mb-2 neon-text">1,450</div>
                        <div className="text-sm text-slate-400 mb-4">+25 this month</div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="progress-inner bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-1000" data-width="58%"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Progress to Specialist</div>
                    </div>

                    <div className="rating-card glass-card rounded-xl p-6 text-white transform perspective-1000 opacity-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">AtCoder</h3>
                            <span className="text-xs bg-blue-500/30 px-2 py-1 rounded">Green</span>
                        </div>
                        <div className="text-3xl font-bold mb-2 neon-text">780</div>
                        <div className="text-sm text-slate-400 mb-4">+15 this month</div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="progress-inner bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-1000" data-width="78%"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Progress to Blue</div>
                    </div>

                    <div className="rating-card glass-card rounded-xl p-6 text-white transform perspective-1000 opacity-0">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold">LeetCode</h3>
                            <span className="text-xs bg-green-500/30 px-2 py-1 rounded">Knight</span>
                        </div>
                        <div className="text-3xl font-bold mb-2 neon-text">400</div>
                        <div className="text-sm text-slate-400 mb-4">Problems solved</div>
                        <div className="w-full bg-slate-700 rounded-full h-2">
                            <div className="progress-inner bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-1000" data-width="80%"></div>
                        </div>
                        <div className="text-xs text-slate-400 mt-2">Progress to Guardian</div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8 mb-8">
                    <div className="glass-card rounded-2xl p-6 transform perspective-1000 opacity-0">
                        <h3 className="text-xl font-bold text-white mb-6">Problem Statistics</h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="text-center">
                                <div className="text-3xl font-bold neon-text mb-2">580</div>
                                <div className="text-slate-400">Total Solved</div>
                                <div className="text-sm text-green-400 mt-1">+42 this month</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold neon-text mb-2">78%</div>
                                <div className="text-slate-400">Accuracy Rate</div>
                                <div className="text-sm text-green-400 mt-1">+2% improvement</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold neon-text mb-2">12</div>
                                <div className="text-slate-400">Current Streak</div>
                                <div className="text-sm text-slate-500 mt-1">Best: 28 days</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-bold neon-text mb-2">1,650</div>
                                <div className="text-slate-400">Avg Problem Rating</div>
                                <div className="text-sm text-green-400 mt-1">+50 this phase</div>
                            </div>
                        </div>
                    </div>

                    <div className="glass-card rounded-2xl p-6 transform perspective-1000 opacity-0">
                        <h3 className="text-xl font-bold text-white mb-6">Rating Progress</h3>
                        <div id="ratingChart" className="chart-container"></div>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 mb-8 transform perspective-1000 opacity-0">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Activity</h3>
                    <div className="space-y-4">
                        <div className="flex items-center space-x-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20 hover:bg-green-500/20 transition-all">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">AC</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Solved "Tree Queries" on Codeforces</div>
                                <div className="text-sm text-slate-400">Rating: 1800 • 2 hours ago</div>
                            </div>
                            <div className="text-green-400 font-medium">+12</div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20 hover:bg-blue-500/20 transition-all">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">CT</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Participated in AtCoder ABC 350</div>
                                <div className="text-sm text-slate-400">Rank: 156/2500 • 1 day ago</div>
                            </div>
                            <div className="text-blue-400 font-medium">+15</div>
                        </div>
                        
                        <div className="flex items-center space-x-4 p-4 bg-purple-500/10 rounded-lg border border-purple-500/20 hover:bg-purple-500/20 transition-all">
                            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">DC</span>
                            </div>
                            <div className="flex-1">
                                <div className="font-medium text-white">Completed daily LeetCode challenge</div>
                                <div className="text-sm text-slate-400">"Maximum Subarray" • 2 days ago</div>
                            </div>
                            <div className="text-purple-400 font-medium">Streak +1</div>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-2xl p-6 transform perspective-1000 opacity-0">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="grid md:grid-cols-4 gap-4">
                        <Link to="/contests" className="btn-3d glass-card rounded-lg p-4 text-center hover:shadow-lg transition-all">
                            <div className="text-2xl mb-2">📅</div>
                            <div className="font-medium text-white">Browse Contests</div>
                            <div className="text-sm text-slate-400">Find upcoming competitions</div>
                        </Link>
                        <Link to="/practice" className="btn-3d glass-card rounded-lg p-4 text-center hover:shadow-lg transition-all">
                            <div className="text-2xl mb-2">📈</div>
                            <div className="font-medium text-white">Track Practice</div>
                            <div className="text-sm text-slate-400">Analyze your progress</div>
                        </Link>
                        <Link to="/insights" className="btn-3d glass-card rounded-lg p-4 text-center hover:shadow-lg transition-all">
                            <div className="text-2xl mb-2">🤖</div>
                            <div className="font-medium text-white">AI Insights</div>
                            <div className="text-sm text-slate-400">Get personalized tips</div>
                        </Link>
                        <Link to="/friends" className="btn-3d glass-card rounded-lg p-4 text-center hover:shadow-lg transition-all">
                            <div className="text-2xl mb-2">👥</div>
                            <div className="font-medium text-white">Compare Friends</div>
                            <div className="text-sm text-slate-400">See leaderboards</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
