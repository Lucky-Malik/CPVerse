// CPVerse Backend API - Fake Data Routes
// This simulates the backend API endpoints with mock data

const API_BASE = '/api';

// Fake database data
const fakeDatabase = {
    users: {
        'user1': {
            id: 'user1',
            name: 'Lucky Malik',
            email: 'lucky.malik@example.com',
            joinedDate: '2023-01-15',
            combinedRating: 1220,
            totalSolved: 580,
            currentStreak: 12,
            platforms: {
                codeforces: { rating: 1450, rank: 'Pupil', handle: 'luckymalik_07' },
                atcoder: { rating: 780, rank: 'Green', handle: 'lucky_malik' },
                leetcode: { solved: 400, rank: 'Knight', handle: 'luckymalik' },
                codechef: { rating: 0, rank: 'Unrated', handle: null }
            }
        }
    },

    // Contests intentionally left empty — real contest data is sourced from clist.by.
    // The original fake contest entries have been commented out to ensure only
    // true contest data from clist.by is displayed in the UI.
    contests: [
        /*
        {
            id: 'cf-2025-11-10-1',
            platform: 'codeforces',
            name: 'Codeforces Round #800 (Div. 1 + Div. 2)',
            start: '2025-11-10T15:00:00Z',
            end: '2025-11-10T17:00:00Z',
            duration: '2h',
            difficulty: '★★★',
            maxRating: '+145',
            url: 'https://codeforces.com/contest/800'
        },
        {
            id: 'ac-2025-11-08-1',
            platform: 'atcoder',
            name: 'AtCoder Beginner Contest 351',
            start: '2025-11-08T12:00:00Z',
            end: '2025-11-08T13:40:00Z',
            duration: '1h 40m',
            difficulty: '★☆☆',
            maxRating: '+120',
            url: 'https://atcoder.jp/contests/abc351'
        },
        {
            id: 'cc-2025-11-12-1',
            platform: 'codechef',
            name: 'CodeChef Starters 120',
            start: '2025-11-12T14:30:00Z',
            end: '2025-11-12T17:30:00Z',
            duration: '3h',
            difficulty: '★★☆',
            maxRating: '+100',
            url: 'https://www.codechef.com/START120'
        },
        {
            id: 'lc-2025-11-11-1',
            platform: 'leetcode',
            name: 'LeetCode Weekly Contest 420',
            start: '2025-11-11T08:00:00Z',
            end: '2025-11-11T09:30:00Z',
            duration: '1h 30m',
            difficulty: '★★☆',
            maxRating: '+200',
            url: 'https://leetcode.com/contest/weekly-contest-420'
        }
        */
    ],

    calendarEvents: {
        'user1': [
            {
                contestId: 'cf-2025-11-10-1',
                title: 'Codeforces Round #800',
                start: '2025-11-10T15:00:00Z',
                remindMinutesBefore: 30,
                notifyVia: 'email'
            },
            {
                contestId: 'ac-2025-11-08-1',
                title: 'AtCoder ABC 351',
                start: '2025-11-08T12:00:00Z',
                remindMinutesBefore: 30,
                notifyVia: 'email'
            }
        ]
    },

    practicePhases: {
        'user1': {
            current: {
                phase: 'Current',
                days: 30,
                solved: 42,
                submissions: 87,
                avgRating: 1650,
                hardest: {
                    name: 'E. Graph Cost',
                    rating: 2100,
                    platform: 'Codeforces'
                },
                verdicts: { AC: 42, WA: 30, TLE: 10, Others: 5 },
                topics: { DP: 12, Graphs: 8, Greedy: 7, Math: 6, Strings: 5, Trees: 4 }
            },
            previous1: {
                phase: 'Previous #1',
                days: 30,
                solved: 35,
                submissions: 92,
                avgRating: 1500,
                verdicts: { AC: 35, WA: 35, TLE: 15, Others: 7 },
                topics: { DP: 8, Graphs: 6, Greedy: 9, Math: 5, Strings: 4, Trees: 3 }
            }
        }
    },

    aiInsights: {
        'user1': {
            summary: "Based on your recent 30-day practice data, you've shown strong improvement in dynamic programming and greedy algorithms. Your accuracy rate has increased by 8% compared to the previous phase, with notable strength in problem-solving approach.",
            topics: {
                DP: 85,
                Graphs: 60,
                Greedy: 72,
                Math: 68,
                'Data Structures': 78,
                Strings: 75,
                Implementation: 82
            },
            recommendations: [
                {
                    type: 'focus',
                    priority: 'High',
                    title: 'Graph Theory Focus',
                    description: 'Your graph theory skills need improvement. Focus on BFS/DFS applications and shortest path algorithms.',
                    action: 'View Problems'
                },
                {
                    type: 'plan',
                    priority: 'Medium',
                    title: '30-Day Challenge',
                    description: 'Structured practice plan focusing on your weak areas with daily problem recommendations.',
                    action: 'Start Plan'
                },
                {
                    type: 'strategy',
                    priority: 'Medium',
                    title: 'Contest Strategy',
                    description: 'Based on your skill profile, target Codeforces Div. 2 contests for optimal rating growth.',
                    action: 'View Schedule'
                }
            ]
        }
    },

    friends: {
        'user1': [
            {
                id: 'user2',
                name: 'Arjun Sharma',
                status: 'online',
                combinedRating: 1450,
                globalRank: 2,
                platforms: {
                    codeforces: { rating: 1650, rank: 'Expert' },
                    atcoder: { rating: 920, rank: 'Blue' },
                    leetcode: { solved: 520, rank: 'Guardian' }
                }
            },
            {
                id: 'user3',
                name: 'Priya Kapoor',
                status: 'offline',
                combinedRating: 1380,
                globalRank: 3,
                platforms: {
                    codeforces: { rating: 1520, rank: 'Specialist' },
                    atcoder: { rating: 850, rank: 'Green' },
                    leetcode: { solved: 480, rank: 'Knight' }
                }
            },
            {
                id: 'user4',
                name: 'Rahul Verma',
                status: 'online',
                combinedRating: 1180,
                globalRank: 5,
                platforms: {
                    codeforces: { rating: 1320, rank: 'Pupil' },
                    atcoder: { rating: 720, rank: 'Green' },
                    leetcode: { solved: 380, rank: 'Knight' }
                }
            }
        ]
    }
};

// API Route Handlers
class CPVerseAPI {
    // Dashboard data
    static getDashboardData(userId = 'user1') {
        const user = fakeDatabase.users[userId];
        if (!user) {
            return { error: 'User not found' };
        }

        return {
            user: user.name,
            platforms: user.platforms,
            summary: {
                combinedRating: user.combinedRating,
                totalSolved: user.totalSolved,
                streak: user.currentStreak
            },
            recentActivity: [
                {
                    type: 'solved',
                    problem: 'Tree Queries',
                    platform: 'Codeforces',
                    rating: 1800,
                    timeAgo: '2 hours ago',
                    result: '+12'
                },
                {
                    type: 'contest',
                    name: 'AtCoder ABC 350',
                    platform: 'AtCoder',
                    rank: '156/2500',
                    timeAgo: '1 day ago',
                    result: '+15'
                },
                {
                    type: 'challenge',
                    name: 'Maximum Subarray',
                    platform: 'LeetCode',
                    timeAgo: '2 days ago',
                    result: 'Streak +1'
                }
            ]
        };
    }

    // Contest data
    // Try to fetch upcoming contests from clist.by API. If an API key is available on
    // `window.CLIST_API_KEY` it will try authenticated requests after an unauthenticated
    // attempt fails. On any network/error or non-JSON response, falls back to the
    // built-in fake data so the UI continues to work offline.
    static async getUpcomingContests(options = {}) {
        // options: { days: number, limit: number }
        const days = options.days || 7;
        const limit = options.limit || 100;

        const CLIST_BASE = 'https://clist.by:443';

        // Helper to build the query string. We do NOT force the `upcoming` or
        // `start_time__during` filters here so the endpoint returns the full
        // ListView shape you requested. Pass `limit`, `offset`, or other filters
        // through the `params` argument.
        function buildUrl(path, params = {}) {
            const url = new URL(`${CLIST_BASE}${path}`);
            // default format
            url.searchParams.set('format', 'json');
            // allow caller to set limit/offset and other query params
            if (params.limit) {
                url.searchParams.set('limit', String(params.limit));
            }
            for (const k in params) {
                if (k === 'limit') continue;
                url.searchParams.set(k, params[k]);
            }
            return url.toString();
        }

        async function tryFetch(url, init = {}) {
            try {
                const res = await fetch(url, init);
                if (!res.ok) {
                    const text = await res.text().catch(() => '');
                    const err = new Error(`clist.by fetch failed: ${res.status} ${res.statusText}`);
                    err.status = res.status;
                    err.body = text;
                    throw err;
                }
                const json = await res.json().catch(() => null);
                if (!json) throw new Error('Invalid JSON from clist.by');
                return json;
            } catch (e) {
                throw e;
            }
        }

        const path = '/api/v4/contest/';
        // Always use query-param method for clist.by requests
        const win = (typeof window !== 'undefined') ? window : {};
        const winUsername = win.CLIST_USERNAME || 'LuckyMalik';
        const winApiKey = win.CLIST_API_KEY || 'ed2cf5f0423791676f67206f2e4c40ac0513eaf4';
        // Match the working curl request
        const url = buildUrl(path, {
            api_key: winApiKey,
            username: winUsername,
            upcoming: 'true',
            limit,
            offset: options.offset || 0
        });

        try {
            const data = await tryFetch(url);
            if (data && (data.objects || data)) {
                return data;
            }
        } catch (err) {
            // If all attempts fail, return empty ListView
            return { meta: { limit, offset: options.offset || 0, total_count: 0 }, objects: [] };
        }

        // If all attempts failed, return an empty ListView object per clist.by schema
        return { meta: { limit: limit, offset: 0, total_count: 0 }, objects: [] };
    }

    // Calendar operations
    static addToCalendar(userId, contestId) {
        const userCalendar = fakeDatabase.calendarEvents[userId] || [];
        const contest = fakeDatabase.contests.find(c => c.id === contestId);
        
        if (!contest) {
            return { error: 'Contest not found' };
        }

        const existingEvent = userCalendar.find(e => e.contestId === contestId);
        if (existingEvent) {
            return { error: 'Contest already in calendar' };
        }

        const newEvent = {
            contestId: contestId,
            title: contest.name,
            start: contest.start,
            remindMinutesBefore: 30,
            notifyVia: 'email'
        };

        userCalendar.push(newEvent);
        fakeDatabase.calendarEvents[userId] = userCalendar;

        return { success: true, event: newEvent };
    }

    static removeFromCalendar(userId, contestId) {
        const userCalendar = fakeDatabase.calendarEvents[userId] || [];
        const index = userCalendar.findIndex(e => e.contestId === contestId);
        
        if (index === -1) {
            return { error: 'Event not found in calendar' };
        }

        userCalendar.splice(index, 1);
        return { success: true };
    }

    static getCalendarEvents(userId) {
        return fakeDatabase.calendarEvents[userId] || [];
    }

    // Practice data
    static getPracticeData(userId, phase = 'current') {
        const userPractice = fakeDatabase.practicePhases[userId];
        if (!userPractice) {
            return { error: 'Practice data not found' };
        }

        return userPractice[phase] || null;
    }

    // AI Insights
    static getAIInsights(userId) {
        const insights = fakeDatabase.aiInsights[userId];
        if (!insights) {
            return { error: 'AI insights not found' };
        }

        return insights;
    }

    // Friends data
    static getFriends(userId) {
        const friends = fakeDatabase.friends[userId];
        if (!friends) {
            return { error: 'Friends data not found' };
        }

        return friends;
    }

    // User preferences update
    static updateUserPreferences(userId, preferences) {
        const user = fakeDatabase.users[userId];
        if (!user) {
            return { error: 'User not found' };
        }

        // Update user preferences
        Object.assign(user, preferences);
        return { success: true, user: user };
    }
}

// Export for use in frontend
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CPVerseAPI;
}

// Make it available globally for browser
if (typeof window !== 'undefined') {
    window.CPVerseAPI = CPVerseAPI;
}