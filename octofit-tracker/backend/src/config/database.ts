import mongoose from 'mongoose';

const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

export const connectToDatabase = async () => {
  await mongoose.connect(mongoUri);
  return mongoose;
};

export const disconnectFromDatabase = async () => {
  await mongoose.disconnect();
};
