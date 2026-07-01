import { Schema, model, type Document } from 'mongoose';

export interface IWorkout extends Document {
  title: string;
  difficulty: string;
  durationMinutes: number;
  focusArea: string;
  equipment: string[];
}

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true, trim: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  focusArea: { type: String, required: true },
  equipment: [{ type: String, required: true }],
});

export const Workout = model<IWorkout>('Workout', workoutSchema);
