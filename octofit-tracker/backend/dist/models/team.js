"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Team = void 0;
const mongoose_1 = require("mongoose");
const teamSchema = new mongoose_1.Schema({
    name: { type: String, required: true, unique: true, trim: true },
    sport: { type: String, required: true },
    members: [{ type: String, required: true }],
    captain: { type: String, required: true },
    focus: { type: String, required: true },
});
exports.Team = (0, mongoose_1.model)('Team', teamSchema);
