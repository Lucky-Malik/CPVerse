import React, { useState, useEffect } from 'react';

const CF_HANDLE = 'Cactii';
const CF_API = `https://codeforces.com/api/user.status?handle=${CF_HANDLE}&from=1&count=100`;

const verdictLabel = (verdict) => {
  switch (verdict) {
    case 'OK': return { text: 'Accepted', color: 'text-emerald-400', bg: 'bg-emerald-900/20', border: 'border-emerald-800' };
    case 'WRONG_ANSWER': return { text: 'Wrong Answer', color: 'text-red-400', bg: 'bg-red-900/20', border: 'border-red-800' };
    case 'TIME_LIMIT_EXCEEDED': return { text: 'TLE', color: 'text-yellow-400', bg: 'bg-yellow-900/20', border: 'border-yellow-800' };
    case 'MEMORY_LIMIT_EXCEEDED': return { text: 'MLE', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-800' };
    case 'RUNTIME_ERROR': return { text: 'Runtime Error', color: 'text-orange-400', bg: 'bg-orange-900/20', border: 'border-orange-800' };
    case 'COMPILATION_ERROR': return { text: 'Compile Error', color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-700' };
    default: return { text: verdict || 'Unknown', color: 'text-gray-400', bg: 'bg-gray-800', border: 'border-gray-700' };
  }
};

const ratingColor = (rating) => {
  if (!rating) return 'text-gray-500';
  if (rating < 1200) return 'text-gray-400';
  if (rating < 1400) return 'text-green-400';
  if (rating < 1600) return 'text-teal-400';
  if (rating < 1900) return 'text-blue-400';
  if (rating < 2100) return 'text-violet-400';
  if (rating < 2400) return 'text-orange-400';
  return 'text-red-400';
};

const formatTimeAgo = (epochSeconds) => {
  const diff = Math.floor(Date.now() / 1000) - epochSeconds;
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
};

const PracticePage = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 20;
  const filters = ['All', 'Accepted', 'Wrong Answer', 'TLE', 'Runtime Error'];

  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(CF_API);
        const json = await res.json();
        if (json.status === 'OK') {
          setSubmissions(json.result);
        } else {
          setError(json.comment || 'Failed to fetch submissions.');
        }
      } catch (e) {
        setError('Network error. Could not reach Codeforces API.');
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  // Deduplicate: best submission per problem (prefer AC)
  const bestPerProblem = React.useMemo(() => {
    const map = new Map();
    for (const sub of submissions) {
      const key = `${sub.problem.contestId}-${sub.problem.index}`;
      if (!map.has(key) || sub.verdict === 'OK') {
        map.set(key, sub);
      }
    }
    return Array.from(map.values());
  }, [submissions]);

  const filtered = bestPerProblem.filter(sub => {
    const vLabel = verdictLabel(sub.verdict).text;
    const matchFilter = filter === 'All' || vLabel === filter;
    const matchSearch = search === '' || sub.problem.name.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const accepted = bestPerProblem.filter(s => s.verdict === 'OK').length;
  const totalUnique = bestPerProblem.length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in relative z-10">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white tracking-tight mb-1">Recent Submissions</h1>
        <p className="text-gray-500 text-sm">
          Codeforces &mdash; <span className="text-gray-400 font-medium">{CF_HANDLE}</span>
        </p>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'Problems Solved', value: loading ? '—' : accepted },
          { label: 'Total Unique', value: loading ? '—' : totalUnique },
          { label: 'Total Submissions', value: loading ? '—' : submissions.length },
          { label: 'Success Rate', value: loading ? '—' : totalUnique ? `${Math.round((accepted / totalUnique) * 100)}%` : '—' },
        ].map(s => (
          <div key={s.label} className="bg-[#0f1117] border border-gray-800 rounded-xl px-4 py-3">
            <div className="text-xs text-gray-500 mb-1 uppercase tracking-wider">{s.label}</div>
            <div className="text-xl font-medium text-gray-200">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <input
          type="text"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          placeholder="Search by problem name..."
          className="flex-1 bg-[#0f1117] border border-gray-800 text-gray-300 text-sm px-4 py-2 rounded-lg focus:outline-none focus:border-gray-600 placeholder-gray-600 transition-colors"
        />
        <div className="flex gap-2 overflow-x-auto pb-1 flex-shrink-0">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => { setFilter(f); setPage(1); }}
              className={`px-3 py-1.5 rounded-md text-xs font-medium border whitespace-nowrap transition-all ${
                filter === f
                  ? 'bg-gray-700 text-white border-gray-600'
                  : 'bg-transparent text-gray-500 border-gray-800 hover:text-gray-300 hover:border-gray-600'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Submission list */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-6 h-6 border-2 border-gray-600 border-t-gray-300 rounded-full animate-spin"></div>
        </div>
      ) : error ? (
        <div className="border border-red-900 text-red-400 bg-red-950/30 p-4 rounded-lg text-sm">{error}</div>
      ) : paginated.length === 0 ? (
        <div className="text-gray-600 text-sm py-12 text-center border border-gray-800 rounded-xl">
          No submissions match your filter.
        </div>
      ) : (
        <>
          {/* Table header */}
          <div className="hidden md:grid grid-cols-12 gap-4 px-4 mb-2 text-xs text-gray-600 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-5">Problem</div>
            <div className="col-span-2">Rating</div>
            <div className="col-span-2">Verdict</div>
            <div className="col-span-2 text-right">When</div>
          </div>

          <div className="space-y-1.5">
            {paginated.map((sub, i) => {
              const v = verdictLabel(sub.verdict);
              const problemUrl = `https://codeforces.com/contest/${sub.problem.contestId}/problem/${sub.problem.index}`;
              return (
                <div
                  key={sub.id}
                  className="bg-[#0f1117] border border-gray-800 hover:border-gray-700 rounded-xl px-4 py-3 grid md:grid-cols-12 gap-2 md:gap-4 items-center transition-colors group"
                >
                  {/* Index */}
                  <div className="hidden md:block col-span-1 text-xs text-gray-700 font-mono">
                    {(page - 1) * PAGE_SIZE + i + 1}
                  </div>

                  {/* Problem name + tags */}
                  <div className="md:col-span-5">
                    <a href={problemUrl} target="_blank" rel="noopener noreferrer">
                      <div className="text-sm text-gray-200 group-hover:text-white transition-colors font-medium leading-snug">
                        {sub.problem.contestId}{sub.problem.index}. {sub.problem.name}
                      </div>
                    </a>
                    {sub.problem.tags?.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {sub.problem.tags.slice(0, 3).map(tag => (
                          <span key={tag} className="text-xs text-gray-600 bg-gray-900 border border-gray-800 px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Rating */}
                  <div className={`hidden md:block col-span-2 text-sm font-medium font-mono ${ratingColor(sub.problem.rating)}`}>
                    {sub.problem.rating ?? '—'}
                  </div>

                  {/* Verdict */}
                  <div className="md:col-span-2">
                    <span className={`inline-block text-xs font-medium px-2 py-0.5 rounded border ${v.color} ${v.bg} ${v.border}`}>
                      {v.text}
                    </span>
                  </div>

                  {/* Time */}
                  <div className="md:col-span-2 text-xs text-gray-600 text-right">
                    {formatTimeAgo(sub.creationTimeSeconds)}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-xs rounded-md border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Prev
              </button>
              <span className="px-3 py-1.5 text-xs text-gray-400 border border-gray-800 rounded-md bg-gray-900">
                {page} / {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-xs rounded-md border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PracticePage;
