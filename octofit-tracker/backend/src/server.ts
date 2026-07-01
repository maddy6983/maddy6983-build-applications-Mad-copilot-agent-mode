import express from 'express';
import { Activity } from './models/activity';
import { LeaderboardEntry } from './models/leaderboard';
import { Team } from './models/team';
import { User } from './models/user';
import { Workout } from './models/workout';
import { connectToDatabase } from './config/database';

interface ResourceResponse<T> {
  data: T[];
  count: number;
  apiUrl: string;
}

export const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : process.env.API_URL || `http://127.0.0.1:${port}`;

app.use(express.json());

const createResourceResponse = <T>(items: T[]): ResourceResponse<T> => ({
  data: items,
  count: items.length,
  apiUrl,
});

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    service: 'octofit-backend',
    port,
    apiUrl,
  });
});

app.get(['/api/users', '/api/users/'], async (_req, res) => {
  const users = await User.find({}).lean();
  res.json(createResourceResponse(users));
});

app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
  const teams = await Team.find({}).lean();
  res.json(createResourceResponse(teams));
});

app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
  const activities = await Activity.find({}).lean();
  res.json(createResourceResponse(activities));
});

app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1 }).lean();
  res.json(createResourceResponse(leaderboard));
});

app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
  const workouts = await Workout.find({}).lean();
  res.json(createResourceResponse(workouts));
});

export const startServer = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB');
  } catch (error) {
    console.warn('MongoDB connection failed; continuing without database.', error);
  }

  app.listen(port, () => {
    console.log(`Backend running on port ${port}`);
    console.log(`API URL: ${apiUrl}`);
  });
};
