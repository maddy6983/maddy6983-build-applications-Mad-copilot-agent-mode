"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardEntry = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    score: { type: Number, required: true },
    streak: { type: Number, required: true },
    lastUpdated: { type: Date, required: true, default: Date.now },
});
exports.LeaderboardEntry = (0, mongoose_1.model)('LeaderboardEntry', leaderboardSchema);
