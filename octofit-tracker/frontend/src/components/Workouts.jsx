import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('workouts')
      .then((data) => setWorkouts(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Workouts</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {workouts.map((workout) => (
            <li key={workout._id || workout.id} className="list-group-item">
              <div className="fw-semibold">{workout.title}</div>
              <div className="text-muted small">{workout.difficulty} • {workout.focusArea}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Workouts;
