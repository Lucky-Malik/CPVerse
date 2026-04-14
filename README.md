# CPVerse

A competitive programming dashboard that pulls your data from Codeforces, LeetCode, and CodeChef into a single interface. Track ratings, browse submissions, view upcoming contests, and get insights on your practice patterns.

Built with React 19, Vite 8, and Tailwind CSS. Contest data comes live from the [CLIST.by](https://clist.by/) API and submissions are fetched from the Codeforces API.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-r160-000000?style=flat-square&logo=three.js&logoColor=white)](https://threejs.org/)

## What it does

- **Dashboard** — unified view of your ratings across Codeforces, AtCoder, and LeetCode with interactive Plotly charts, problem stats, and a recent activity feed.
- **Contests** — live upcoming contest data from CLIST.by with platform filters (Codeforces / LeetCode / CodeChef), register links, and a saved contests sidebar.
- **Practice** — browse your Codeforces submissions with verdict filters, problem search, difficulty color-coding, and tag display. Deduplicates to show best verdict per problem.
- **Insights** — skill radar chart, topic-level progress tracking, AI-generated recommendations, performance trends, learning velocity metrics, and weekly goal tracking.
- **Friends** — add friends, compare per-platform ratings, see a combined leaderboard, and view rating trend comparisons over time.
- **Profile** — manage personal info, view connected platform handles, toggle preferences, and interact with a Three.js robot avatar that follows your cursor.

## Architecture

```
CPVerse/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── components/
│   │   ├── BackgroundEffect.jsx   # Vanta.js animated backgrounds (dots / net)
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx             # Wraps Navbar + Footer around pages
│   │   └── Navbar.jsx             # Scroll-aware sticky nav with backdrop blur
│   ├── pages/
│   │   ├── HomePage.jsx           # Landing page with hero and feature overview
│   │   ├── DashboardPage.jsx      # Ratings, charts, activity feed
│   │   ├── ContestsPage.jsx       # Live contest calendar from CLIST
│   │   ├── PracticePage.jsx       # Codeforces submission browser
│   │   ├── InsightsPage.jsx       # Skill analysis, recommendations, goals
│   │   ├── FriendsPage.jsx        # Friend list, leaderboard, comparison charts
│   │   └── ProfilePage.jsx        # Settings, platform connections, 3D avatar
│   ├── utils/
│   │   └── api.js                 # CLIST integration + mock data layer
│   ├── App.jsx                    # Route definitions
│   ├── main.jsx                   # Entry point with ErrorBoundary
│   └── index.css                  # Global styles + Tailwind directives
├── index.html                     # Vite entry (loads Three.js + Vanta CDN)
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── eslint.config.js
```

### Routes

| Path | Page |
|------|------|
| `/` | Landing page |
| `/dashboard.html` | Dashboard |
| `/contests.html` | Contest calendar |
| `/practice.html` | Submission browser |
| `/insights.html` | Insights & analysis |
| `/friends.html` | Friends & leaderboard |
| `/profile.html` | Profile settings |

### Key dependencies

| Package | What it's used for |
|---------|--------------------|
| `react` / `react-dom` | UI framework |
| `react-router-dom` | Client-side routing |
| `plotly.js-dist-min` / `react-plotly.js` | Interactive charts (rating history, radar, trends) |
| `three` | 3D robot avatar on the profile page |
| `vanta` | Animated dot/net backgrounds |
| `lucide-react` | Icons |

## How to run

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** — version 18 or higher ([download](https://nodejs.org/))
- **npm** — comes bundled with Node.js (version 9+ recommended)

You can verify by running:

```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

### Setup

1. Clone the repository:

```bash
git clone https://github.com/Lucky-Malik/CPVerse.git
cd CPVerse
```

2. Install dependencies:

```bash
npm install
```

This will install React, Vite, Tailwind CSS, Plotly, Three.js, Vanta, and everything else listed in `package.json`.

3. Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`. Vite supports hot module replacement, so any changes you save will reflect instantly in the browser.

### Environment variables (optional)

The app ships with default CLIST API credentials that work out of the box for development. If you want to use your own, create a `.env` file in the project root:

```
VITE_CLIST_USERNAME=your_username
VITE_CLIST_API_KEY=your_api_key
```

You can register for a free API key at [clist.by](https://clist.by/). Without this, the Contests page will still work using the bundled defaults.

### Available scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Starts the Vite dev server with HMR |
| `npm run build` | Creates an optimized production build in `dist/` |
| `npm run preview` | Serves the production build locally for testing |
| `npm run lint` | Runs ESLint across the project |

### Troubleshooting

- **Port already in use** — Vite will automatically try the next available port. Check the terminal output for the actual URL.
- **Blank page on load** — Open the browser console. If you see Vanta.js errors, make sure you're connected to the internet (Three.js and Vanta are loaded from CDN in `index.html`).
- **CLIST API returning empty** — The free tier has rate limits. Wait a few minutes and refresh, or add your own API key in `.env`.

## API integrations

**CLIST.by** (`https://clist.by/api/v4/contest/`) — fetches upcoming contests from Codeforces, LeetCode, and CodeChef. The app handles auth via query params and falls back gracefully if the API is unreachable.

**Codeforces** (`https://codeforces.com/api/user.status`) — pulls recent submissions for the practice page. No auth required.

Everything else (dashboard stats, friend data, AI insights) uses mock data from `src/utils/api.js` so the UI is fully functional without any backend.

## Contributing

Contributions are welcome. Whether it's a bug fix, a new feature, or a documentation improvement, here's how to get started.

### Getting set up

1. Fork this repository on GitHub.
2. Clone your fork locally:

```bash
git clone https://github.com/your-username/CPVerse.git
cd CPVerse
npm install
```

3. Create a new branch for your work:

```bash
git checkout -b feature/your-feature-name
```

4. Make your changes, then run the dev server to test:

```bash
npm run dev
```

5. Make sure linting passes:

```bash
npm run lint
```

6. Commit and push:

```bash
git add .
git commit -m "add your feature"
git push origin feature/your-feature-name
```

7. Open a Pull Request against the `master` branch on this repo.

### Code style

- Use **Tailwind utility classes** for styling. Avoid writing custom CSS unless absolutely necessary.
- Keep components small and focused. If a component is getting too long, break it into subcomponents.
- Follow the existing dark theme design language (`#080a0e` backgrounds, `gray-800` borders, muted text colors).
- Use `react-router-dom` `Link` for internal navigation, not `<a>` tags.

### Branch naming

- `feature/description` — for new features
- `fix/description` — for bug fixes
- `docs/description` — for documentation changes

### What to work on

Check the [Issues](https://github.com/Lucky-Malik/CPVerse/issues) tab for open tasks. If you want to work on something not listed, open an issue first to discuss it.

Some ideas:
- Add support for more platforms (AtCoder submissions, LeetCode stats)
- Implement local storage for saving user preferences
- Add dark/light theme toggle
- Make the Codeforces handle configurable from the UI
- Add unit tests

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## Acknowledgements

- [Codeforces](https://codeforces.com/) — Competitive programming platform & API
- [CLIST.by](https://clist.by/) — Aggregated contest calendar API
- [Vanta.js](https://www.vantajs.com/) — Animated 3D backgrounds
- [Three.js](https://threejs.org/) — 3D graphics library
- [Plotly.js](https://plotly.com/javascript/) — Interactive charting
- [Lucide](https://lucide.dev/) — Beautiful open-source icons
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework

---

<div align="center">

**Built with ❤️ for the competitive programming community**

[⬆ Back to Top](#-cpverse)

</div>
