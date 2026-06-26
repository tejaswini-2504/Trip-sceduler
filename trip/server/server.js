const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const tripRoutes = require('./routes/tripRoutes');
const errorMiddleware = require('./middleware/errorMiddleware');

dotenv.config();
if (!process.env.MONGO_URI) {
  console.warn('Warning: MONGO_URI is not set. The backend will not connect to MongoDB without a valid URI.');
}
if (!process.env.JWT_SECRET) {
  console.warn('Warning: JWT_SECRET is not set. Using a development fallback secret.');
  process.env.JWT_SECRET = 'tripwise_dev_secret';
}
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`TripWise backend running on port ${PORT}`);
});
