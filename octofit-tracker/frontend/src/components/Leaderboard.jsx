import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const leaderboardUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : 'http://127.0.0.1:8000/api/leaderboard/';

const normalizeCollection = (payload) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  if (payload && payload.results && Array.isArray(payload.results)) {
    return payload.results;
  }

  return [];
};

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(leaderboardUrl)
      .then((response) => response.json())
      .then((payload) => setEntries(normalizeCollection(payload)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Leaderboard</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ol className="list-group list-group-numbered">
          {entries.map((entry) => (
            <li key={entry._id || entry.username} className="list-group-item d-flex justify-content-between align-items-start">
              <div>
                <div className="fw-semibold">{entry.username}</div>
                <div className="text-muted small">Streak: {entry.streak}</div>
              </div>
              <span className="badge bg-primary rounded-pill">{entry.score}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

export default Leaderboard;
