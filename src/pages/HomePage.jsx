import React from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffect from '../components/BackgroundEffect';

const HomePage = () => {
    return (
        <>
            {/* Hero */}
            <section className="min-h-screen flex items-center justify-center relative overflow-hidden pt-14">
                <BackgroundEffect type="dots" id="vanta-bg" className="absolute inset-0" />
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <div className="inline-block text-xs font-medium text-gray-500 border border-gray-800 px-3 py-1 rounded-full mb-8 tracking-wider uppercase">
                        Competitive Programming Dashboard
                    </div>
                    <h1 className="text-4xl md:text-6xl font-semibold text-white mb-6 leading-tight tracking-tight">
                        One place for<br />
                        <span className="text-gray-400">all your CP stats</span>
                    </h1>
                    <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
                        Track ratings, review submissions, and stay ahead of upcoming contests — across Codeforces, LeetCode, and CodeChef.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <Link
                            to="/dashboard.html"
                            className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-900 text-sm font-semibold hover:bg-white transition-colors"
                        >
                            Open Dashboard
                        </Link>
                        <a
                            href="#features"
                            className="px-6 py-2.5 rounded-lg border border-gray-700 text-gray-400 text-sm font-medium hover:border-gray-500 hover:text-gray-200 transition-colors"
                        >
                            See Features
                        </a>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section id="features" className="py-24 bg-[#080a0e]">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-2xl font-semibold text-white mb-3">Everything in one interface</h2>
                        <p className="text-gray-500 max-w-xl mx-auto">
                            From rating history to live contest feeds — no more switching between tabs.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {[
                            { title: 'Unified Ratings', desc: 'Track your ratings across all platforms in one view.', sub: 'Codeforces · LeetCode · CodeChef' },
                            { title: 'Contest Calendar', desc: 'Never miss an upcoming contest with live CLIST data.', sub: 'Live API · Auto refresh' },
                            { title: 'Submission History', desc: 'Browse all your recent Codeforces submissions with filters.', sub: 'Verdict · Rating · Tags' },
                            { title: 'Insights', desc: 'Analyze practice patterns and skill distribution.', sub: 'Topic Analysis · Progress' },
                        ].map(f => (
                            <div key={f.title} className="bg-[#0f1117] border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors">
                                <h3 className="text-sm font-semibold text-gray-200 mb-2">{f.title}</h3>
                                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{f.desc}</p>
                                <div className="text-xs text-gray-600">{f.sub}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Dashboard preview */}
            <section className="py-20 bg-[#080a0e] border-t border-gray-800/50">
                <div className="max-w-6xl mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-semibold text-white mb-3">Your complete overview</h2>
                        <p className="text-gray-500">See all your data unified in a single interface.</p>
                    </div>

                    <div className="bg-[#0f1117] border border-gray-800 rounded-2xl p-8">
                        <div className="grid lg:grid-cols-3 gap-6">
                            {/* Profile preview */}
                            <div className="lg:col-span-1 bg-[#080a0e] border border-gray-800 rounded-xl p-5">
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-700 flex items-center justify-center text-sm font-semibold text-gray-300">LM</div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-200">Lucky Malik</div>
                                        <div className="text-xs text-gray-500">Competitive Programmer</div>
                                    </div>
                                </div>
                                {[
                                    { label: 'Combined Rating', value: '1,220' },
                                    { label: 'Total Solved', value: '580' },
                                    { label: 'Current Streak', value: '12 days' },
                                ].map(s => (
                                    <div key={s.label} className="flex justify-between text-sm py-1.5 border-b border-gray-800 last:border-0">
                                        <span className="text-gray-500">{s.label}</span>
                                        <span className="text-gray-300 font-medium">{s.value}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Platform ratings */}
                            <div className="lg:col-span-2">
                                <div className="text-sm font-medium text-gray-400 mb-4">Platform Ratings</div>
                                <div className="grid sm:grid-cols-3 gap-3">
                                    {[
                                        { name: 'Codeforces', rank: 'Pupil', rating: '1,450', delta: '+25' },
                                        { name: 'LeetCode', rank: 'Knight', rating: '400', delta: 'Solved' },
                                        { name: 'CodeChef', rank: '3 Star', rating: '1,600', delta: '+10' },
                                    ].map(p => (
                                        <div key={p.name} className="bg-[#080a0e] border border-gray-800 rounded-xl p-4">
                                            <div className="flex justify-between items-center mb-1">
                                                <span className="text-xs text-gray-400 font-medium">{p.name}</span>
                                                <span className="text-xs text-gray-600 border border-gray-800 px-1.5 py-0.5 rounded">{p.rank}</span>
                                            </div>
                                            <div className="text-xl font-semibold text-gray-200">{p.rating}</div>
                                            <div className="text-xs text-gray-600 mt-0.5">{p.delta}</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex flex-wrap gap-3 mt-6 pt-5 border-t border-gray-800">
                                    {[
                                        { to: '/dashboard.html', label: 'Dashboard' },
                                        { to: '/contests.html', label: 'Contests' },
                                        { to: '/practice.html', label: 'Practice' },
                                        { to: '/insights.html', label: 'Insights' },
                                    ].map(l => (
                                        <Link
                                            key={l.to}
                                            to={l.to}
                                            className="text-xs px-3 py-1.5 rounded-md border border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300 transition-colors"
                                        >
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
