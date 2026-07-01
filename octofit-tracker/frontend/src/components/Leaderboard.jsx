import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('leaderboard')
      .then((data) => setEntries(data))
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
