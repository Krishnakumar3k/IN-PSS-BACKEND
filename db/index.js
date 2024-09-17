import mongoose, { createConnection } from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const createConnectionMongoose = () => {
  mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Database connected successfully!'))
  .catch((err) => console.error('Database connection error:', err));
};

export default createConnectionMongoose;
