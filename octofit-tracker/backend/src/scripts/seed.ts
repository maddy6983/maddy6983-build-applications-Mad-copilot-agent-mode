import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

// Seed the octofit_db database with test data
const seedDatabase = async () => {
  const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

  await mongoose.connect(mongoUri);
  console.log('Connected to MongoDB for seeding');

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    {
      username: 'morgan',
      email: 'morgan@example.com',
      passwordHash: 'hashed_password_1',
      role: 'captain',
      profile: {
        fullName: 'Morgan Lee',
        fitnessGoal: 'Half marathon',
        location: 'Seattle',
      },
    },
    {
      username: 'alex',
      email: 'alex@example.com',
      passwordHash: 'hashed_password_2',
      role: 'member',
      profile: {
        fullName: 'Alex Rivera',
        fitnessGoal: 'Strength training',
        location: 'Austin',
      },
    },
    {
      username: 'sam',
      email: 'sam@example.com',
      passwordHash: 'hashed_password_3',
      role: 'member',
      profile: {
        fullName: 'Sam Chen',
        fitnessGoal: 'Improve mobility',
        location: 'Denver',
      },
    },
  ]);

  const teams = await Team.insertMany([
    {
      name: 'Night Owls',
      sport: 'Running',
      members: users.slice(0, 2).map((user) => user.username),
      captain: 'morgan',
      focus: 'Endurance training',
    },
    {
      name: 'Peak Performers',
      sport: 'Cycling',
      members: [users[2].username],
      captain: 'alex',
      focus: 'Tempo intervals',
    },
  ]);

  await Activity.insertMany([
    {
      userId: users[0].id,
      type: 'Run',
      durationMinutes: 35,
      caloriesBurned: 320,
      date: new Date('2026-06-28T07:15:00Z'),
      notes: 'Early morning interval run',
    },
    {
      userId: users[1].id,
      type: 'Yoga',
      durationMinutes: 25,
      caloriesBurned: 180,
      date: new Date('2026-06-29T18:30:00Z'),
      notes: 'Recovery session',
    },
    {
      userId: users[2].id,
      type: 'Cycling',
      durationMinutes: 45,
      caloriesBurned: 410,
      date: new Date('2026-06-30T06:00:00Z'),
      notes: 'Hill repeats',
    },
  ]);

  await LeaderboardEntry.insertMany([
    { username: 'morgan', score: 980, streak: 7 },
    { username: 'alex', score: 945, streak: 4 },
    { username: 'sam', score: 912, streak: 3 },
  ]);

  await Workout.insertMany([
    {
      title: 'Tempo Run',
      difficulty: 'Intermediate',
      durationMinutes: 40,
      focusArea: 'Cardio',
      equipment: ['Running shoes'],
    },
    {
      title: 'Core Strength',
      difficulty: 'Beginner',
      durationMinutes: 25,
      focusArea: 'Core',
      equipment: ['Mat'],
    },
    {
      title: 'Interval Ride',
      difficulty: 'Advanced',
      durationMinutes: 50,
      focusArea: 'Legs',
      equipment: ['Bike'],
    },
  ]);

  console.log('Seeded octofit_db with test data');
  await mongoose.disconnect();
};

void seedDatabase().catch((error) => {
  console.error('Seeding failed', error);
  process.exit(1);
});
