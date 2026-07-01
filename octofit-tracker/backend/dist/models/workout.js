"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const mongoose_1 = require("mongoose");
const workoutSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    focusArea: { type: String, required: true },
    equipment: [{ type: String, required: true }],
});
exports.Workout = (0, mongoose_1.model)('Workout', workoutSchema);
