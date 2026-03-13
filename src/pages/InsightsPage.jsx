import React, { useState, useEffect } from 'react';

const skills = [
    { name: 'Dynamic Programming', pct: 85, color: '#6ee7b7' },
    { name: 'Greedy Algorithms', pct: 72, color: '#64b5f6' },
    { name: 'Mathematics', pct: 68, color: '#ffb74d' },
    { name: 'Graph Theory', pct: 60, color: '#ef9a9a' },
    { name: 'Data Structures', pct: 78, color: '#80cbc4' },
];

const recs = [
    { title: 'Focus Area', sub: 'Graph Theory', detail: 'Your graph theory skills need improvement. Focus on BFS/DFS and shortest path algorithms.', badge: 'Priority: High', action: 'View Problems' },
    { title: 'Practice Plan', sub: '30-Day Challenge', detail: 'Structured plan focusing on weak areas with daily problem recommendations.', badge: '15 problems/week', action: 'Start Plan' },
    { title: 'Contest Strategy', sub: 'Next Contest', detail: 'Target Codeforces Div. 2 contests for optimal rating growth based on your profile.', badge: 'Expected: +50', action: 'View Schedule' },
];

const velocity = [
    { label: 'Solving Speed', value: '+15%', sub: '15% faster than last month' },
    { label: 'Accuracy Rate', value: '78%', sub: 'Above average' },
    { label: 'Concept Mastery', value: 'Fast', sub: 'Rapid improvement in DP' },
    { label: 'Consistency', value: 'High', sub: '12-day active streak' },
];

const InsightsPage = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [notification, setNotification] = useState(null);

    const handleGenerate = () => {
        setIsGenerating(true);
        setTimeout(() => {
            setNotification('Insights refreshed with latest data');
            setIsGenerating(false);
            setTimeout(() => setNotification(null), 3000);
        }, 2500);
    };

    useEffect(() => {
        const renderCharts = () => {
            if (window.Plotly) {
                const skillData = [{
                    type: 'scatterpolar',
                    r: [85, 72, 68, 60, 78, 75, 82],
                    theta: ['DP', 'Greedy', 'Math', 'Graphs', 'Data Struct', 'Strings', 'Impl.'],
                    fill: 'toself',
                    name: 'Skills',
                    line: { color: '#6ee7b7', width: 1.5 },
                    fillcolor: 'rgba(110,231,183,0.1)',
                }];
                const radarLayout = {
                    polar: {
                        bgcolor: 'rgba(0,0,0,0)',
                        radialaxis: { visible: true, range: [0, 100], tickfont: { size: 9, color: '#4b5563' }, gridcolor: '#1f2937', linecolor: '#1f2937' },
                        angularaxis: { tickfont: { size: 11, color: '#9ca3af' }, gridcolor: '#1f2937', linecolor: '#1f2937' },
                    },
                    showlegend: false,
                    margin: { t: 10, r: 30, b: 10, l: 30 },
                    plot_bgcolor: 'rgba(0,0,0,0)',
                    paper_bgcolor: 'rgba(0,0,0,0)',
                };

                const perfData = [
                    { x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], y: [65, 72, 78, 85], name: 'DP', type: 'scatter', mode: 'lines+markers', line: { color: '#6ee7b7', width: 2 }, marker: { size: 5 } },
                    { x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], y: [58, 60, 65, 72], name: 'Graphs', type: 'scatter', mode: 'lines+markers', line: { color: '#ef9a9a', width: 2 }, marker: { size: 5 } },
                    { x: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], y: [70, 75, 80, 82], name: 'Overall', type: 'scatter', mode: 'lines', line: { color: '#4b5563', width: 1.5, dash: 'dot' } },
                ];
                const perfLayout = {
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
                    const r = document.getElementById('skillRadarChart');
                    if (r) window.Plotly.newPlot('skillRadarChart', skillData, radarLayout, { responsive: true, displayModeBar: false });
                    const p = document.getElementById('performanceChart');
                    if (p) window.Plotly.newPlot('performanceChart', perfData, perfLayout, { responsive: true, displayModeBar: false });
                }, 100);
            }
        };
        renderCharts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 relative z-10 animate-fade-in">
            {notification && (
                <div className="fixed top-6 right-4 z-50 px-5 py-2.5 rounded-lg text-sm bg-gray-800 border border-gray-700 text-gray-200 shadow-xl">
                    {notification}
                </div>
            )}

            {/* Header */}
            <div className="mb-8 flex items-start justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Insights</h1>
                    <p className="text-gray-500 text-sm">Skill analysis and personalized recommendations</p>
                </div>
                <button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    className="text-xs px-3 py-1.5 rounded-md border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                    {isGenerating ? 'Analyzing...' : 'Refresh Insights'}
                </button>
            </div>

            {/* Summary banner */}
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5 mb-6">
                <div className="text-sm font-medium text-gray-300 mb-2">AI Analysis Summary</div>
                <p className="text-sm text-gray-500 leading-relaxed">
                    Based on your recent 30-day practice, you've shown strong improvement in dynamic programming and greedy algorithms.
                    Your accuracy rate has increased by <span className="text-gray-300 font-medium">8%</span> compared to the previous phase.
                </p>
                <div className="flex gap-2 mt-3">
                    {['Strong Growth', 'Focused Practice', 'Quick Learner'].map(tag => (
                        <span key={tag} className="text-xs text-gray-600 border border-gray-800 px-2 py-0.5 rounded">{tag}</span>
                    ))}
                </div>
            </div>

            {/* Charts + skills */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-3">Skill Radar</div>
                    <div id="skillRadarChart" style={{ height: '220px' }} />
                </div>

                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-4">Skill Breakdown</div>
                    <div className="space-y-3">
                        {skills.map(s => (
                            <div key={s.name}>
                                <div className="flex justify-between text-xs mb-1">
                                    <span className="text-gray-400">{s.name}</span>
                                    <span className="text-gray-500">{s.pct}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, backgroundColor: s.color, opacity: 0.7 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recommendations */}
            <div className="mb-6">
                <div className="text-sm font-medium text-gray-400 mb-3">Recommendations</div>
                <div className="grid md:grid-cols-3 gap-3">
                    {recs.map(r => (
                        <div key={r.title} className="bg-[#0f1117] border border-gray-800 rounded-xl p-4 hover:border-gray-700 transition-colors">
                            <div className="text-sm font-medium text-gray-300 mb-0.5">{r.title}</div>
                            <div className="text-xs text-gray-600 mb-3">{r.sub}</div>
                            <p className="text-xs text-gray-500 mb-3 leading-relaxed">{r.detail}</p>
                            <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-700">{r.badge}</span>
                                <button className="text-xs text-gray-500 hover:text-gray-300 transition-colors">{r.action} →</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Performance trend + velocity */}
            <div className="grid lg:grid-cols-2 gap-4 mb-6">
                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-3">Performance Trends</div>
                    <div id="performanceChart" style={{ height: '180px' }} />
                </div>

                <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                    <div className="text-sm font-medium text-gray-400 mb-4">Learning Velocity</div>
                    <div className="space-y-3">
                        {velocity.map(v => (
                            <div key={v.label} className="flex items-center justify-between py-1 border-b border-gray-800/60 last:border-0">
                                <div>
                                    <div className="text-sm text-gray-300">{v.label}</div>
                                    <div className="text-xs text-gray-600">{v.sub}</div>
                                </div>
                                <span className="text-sm font-medium text-gray-500">{v.value}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Weekly goals */}
            <div className="bg-[#0f1117] border border-gray-800 rounded-xl p-5">
                <div className="text-sm font-medium text-gray-400 mb-4">Weekly Goals</div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-2">
                    {[
                        { text: 'Solve 5 graph theory problems', progress: '3/5', done: false },
                        { text: 'Participate in 2 contests', progress: '2/2', done: true },
                        { text: 'Master segment trees', progress: '0/1', done: false },
                        { text: 'Review 10 previous problems', progress: '8/10', done: false },
                        { text: 'Complete daily challenges', progress: '4/7', done: false },
                        { text: 'Write editorial for one problem', progress: '0/1', done: false },
                    ].map((g, i) => (
                        <div key={i} className="flex items-center gap-3 py-1.5">
                            <div className={`w-3.5 h-3.5 rounded border flex-shrink-0 ${g.done ? 'bg-gray-700 border-gray-600' : 'border-gray-700'}`} />
                            <span className="text-sm text-gray-400 flex-1">{g.text}</span>
                            <span className="text-xs text-gray-700">{g.progress}</span>
                        </div>
                    ))}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800 flex items-center justify-between">
                    <span className="text-xs text-gray-600">Progress: <span className="text-gray-400">58%</span></span>
                    <button className="text-xs px-3 py-1.5 rounded-md border border-gray-700 text-gray-400 hover:border-gray-500 hover:text-gray-200 transition-colors">
                        Update Goals
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InsightsPage;
