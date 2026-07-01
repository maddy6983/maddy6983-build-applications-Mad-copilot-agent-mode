import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('teams')
      .then((data) => setTeams(data))
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
