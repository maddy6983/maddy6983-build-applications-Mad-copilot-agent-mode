import mongoose, { Schema, model, type Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  profile: {
    fullName: string;
    fitnessGoal: string;
    location: string;
  };
}

const userSchema = new Schema<IUser>({
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

export const User = model<IUser>('User', userSchema);
