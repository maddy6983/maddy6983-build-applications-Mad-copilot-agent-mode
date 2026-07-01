import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
const activitiesUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/activities/`
  : 'http://127.0.0.1:8000/api/activities/';

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

function Activities() {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(activitiesUrl)
      .then((response) => response.json())
      .then((payload) => setActivities(normalizeCollection(payload)))
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
