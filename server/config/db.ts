import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const URI = process.env.MONGO_URI as string

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log('Database Connected');
  } catch (err:any) {
    console.error(err?.message);
    process.exit(1);
  }
};

export default connectDB;
