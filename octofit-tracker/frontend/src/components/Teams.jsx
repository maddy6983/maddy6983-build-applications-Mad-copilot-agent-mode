import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const teamsUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : 'http://127.0.0.1:8000/api/teams/';

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

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(teamsUrl)
      .then((response) => response.json())
      .then((payload) => setTeams(normalizeCollection(payload)))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Teams</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {teams.map((team) => (
            <li key={team._id || team.id} className="list-group-item">
              <div className="fw-semibold">{team.name}</div>
              <div className="text-muted small">Sport: {team.sport}</div>
              <div className="text-muted small">Captain: {team.captain}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Teams;
