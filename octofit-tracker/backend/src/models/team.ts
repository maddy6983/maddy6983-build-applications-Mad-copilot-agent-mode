import mongoose, { Schema, model, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  members: string[];
  captain: string;
  focus: string;
}

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true, trim: true },
  sport: { type: String, required: true },
  members: [{ type: String, required: true }],
  captain: { type: String, required: true },
  focus: { type: String, required: true },
});

export const Team = model<ITeam>('Team', teamSchema);
