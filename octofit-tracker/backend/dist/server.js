"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startServer = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const activity_1 = require("./models/activity");
const leaderboard_1 = require("./models/leaderboard");
const team_1 = require("./models/team");
const user_1 = require("./models/user");
const workout_1 = require("./models/workout");
const database_1 = require("./config/database");
exports.app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
    ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
    : process.env.API_URL || `http://127.0.0.1:${port}`;
exports.app.use(express_1.default.json());
const createResourceResponse = (items) => ({
    data: items,
    count: items.length,
    apiUrl,
});
exports.app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        service: 'octofit-backend',
        port,
        apiUrl,
    });
});
exports.app.get(['/api/users', '/api/users/'], async (_req, res) => {
    const users = await user_1.User.find({}).lean();
    res.json(createResourceResponse(users));
});
exports.app.get(['/api/teams', '/api/teams/'], async (_req, res) => {
    const teams = await team_1.Team.find({}).lean();
    res.json(createResourceResponse(teams));
});
exports.app.get(['/api/activities', '/api/activities/'], async (_req, res) => {
    const activities = await activity_1.Activity.find({}).lean();
    res.json(createResourceResponse(activities));
});
exports.app.get(['/api/leaderboard', '/api/leaderboard/'], async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find({}).sort({ score: -1 }).lean();
    res.json(createResourceResponse(leaderboard));
});
exports.app.get(['/api/workouts', '/api/workouts/'], async (_req, res) => {
    const workouts = await workout_1.Workout.find({}).lean();
    res.json(createResourceResponse(workouts));
});
const startServer = async () => {
    try {
        await (0, database_1.connectToDatabase)();
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.warn('MongoDB connection failed; continuing without database.', error);
    }
    exports.app.listen(port, () => {
        console.log(`Backend running on port ${port}`);
        console.log(`API URL: ${apiUrl}`);
    });
};
exports.startServer = startServer;
