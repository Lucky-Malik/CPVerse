import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import ContestsPage from './pages/ContestsPage';
import PracticePage from './pages/PracticePage';
import ProfilePage from './pages/ProfilePage';
import FriendsPage from './pages/FriendsPage';
import InsightsPage from './pages/InsightsPage';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/dashboard.html" element={<DashboardPage />} />
          <Route path="/contests.html" element={<ContestsPage />} />
          <Route path="/practice.html" element={<PracticePage />} />
          <Route path="/profile.html" element={<ProfilePage />} />
          <Route path="/friends.html" element={<FriendsPage />} />
          <Route path="/insights.html" element={<InsightsPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
