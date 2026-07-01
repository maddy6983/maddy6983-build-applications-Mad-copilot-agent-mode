import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('activities')
      .then((data) => setActivities(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Activities</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {activities.map((activity) => (
            <li key={activity._id || activity.id} className="list-group-item">
              <div className="fw-semibold">{activity.type}</div>
              <div className="text-muted small">
                {activity.durationMinutes || activity.duration} min • {activity.caloriesBurned || activity.calories} kcal
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Activities;
