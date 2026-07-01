import './App.css'

function App() {
  return (
    <div className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <h1 className="display-4 fw-bold">OctoFit Tracker</h1>
          <p className="lead text-muted">
            A modern multi-tier fitness experience for logging activities, managing teams,
            and climbing the leaderboard.
          </p>
          <div className="d-flex flex-wrap gap-3 mt-4">
            <a className="btn btn-primary btn-lg" href="/api/health">
              Check API health
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="https://vite.dev/">
              Vite docs
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h2 className="h4">Application tiers</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item">Presentation: React 19 + Vite</li>
                <li className="list-group-item">Logic: Node.js + Express + TypeScript</li>
                <li className="list-group-item">Data: MongoDB + Mongoose</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
