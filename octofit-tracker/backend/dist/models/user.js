"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, required: true, default: 'member' },
    profile: {
        fullName: { type: String, required: true },
        fitnessGoal: { type: String, required: true },
        location: { type: String, required: true },
    },
});
exports.User = (0, mongoose_1.model)('User', userSchema);
