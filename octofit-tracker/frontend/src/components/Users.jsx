import { useEffect, useState } from 'react';
import { fetchCollection } from '../lib/api';

function Users() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCollection('users')
      .then((data) => setUsers(data))
      .catch((err) => setError(err.message));
  }, []);

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 mb-3">Users</h2>
        {error ? <div className="alert alert-danger">{error}</div> : null}
        <ul className="list-group">
          {users.map((user) => (
            <li key={user._id || user.id} className="list-group-item">
              <div className="fw-semibold">{user.username}</div>
              <div className="text-muted small">{user.email}</div>
              <div className="text-muted small">Role: {user.role}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Users;
