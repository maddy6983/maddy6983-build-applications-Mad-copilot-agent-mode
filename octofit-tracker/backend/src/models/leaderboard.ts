import { Schema, model, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  username: string;
  score: number;
  streak: number;
  lastUpdated: Date;
}

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  username: { type: String, required: true, unique: true, trim: true },
  score: { type: Number, required: true },
  streak: { type: Number, required: true },
  lastUpdated: { type: Date, required: true, default: Date.now },
});

export const LeaderboardEntry = model<ILeaderboardEntry>('LeaderboardEntry', leaderboardSchema);
