import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navItems = [
  { to: '/', label: 'Overview' },
  { to: '/users', label: 'Users' },
  { to: '/teams', label: 'Teams' },
  { to: '/activities', label: 'Activities' },
  { to: '/leaderboard', label: 'Leaderboard' },
  { to: '/workouts', label: 'Workouts' },
];

function Overview() {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4">OctoFit Tracker</h2>
        <p className="text-muted">
          A multi-tier fitness experience for managing users, teams, activities, workouts, and progress.
        </p>
        <div className="alert alert-info mb-0">
          Configure VITE_CODESPACE_NAME in .env.local to enable Codespaces-friendly API URLs.
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div className="container py-5">
      <div className="row g-4">
        <div className="col-lg-3">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h1 className="h4 fw-bold">OctoFit Tracker</h1>
              <p className="text-muted small">Presentation tier</p>
              <nav className="d-flex flex-column gap-2 mt-3">
                {navItems.map((item) => (
                  <NavLink key={item.to} to={item.to} className={({ isActive }) => `nav-link ${isActive ? 'active fw-semibold' : ''}`}>
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className="col-lg-9">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
