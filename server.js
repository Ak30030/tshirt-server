import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.js';
import productRoutes from './routes/products.js';
import cartRoutes from './routes/cart.js';
import orderRoutes from './routes/orders.js';


dotenv.config();

const app = express();

// ✅ Middleware FIRST
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Routes AFTER middleware
app.get('/', (req, res) => {
  res.json({ message: 'T-Shirt Shop API is running!' });
});

app.use('/auth', authRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);
app.use('/orders', orderRoutes);

const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.DATABASE_URL;
if (!mongoUri) {
  console.error('❌ Missing MongoDB connection string. Set MONGODB_URI, MONGO_URI, or DATABASE_URL in Render or your .env file.');
  process.exit(1);
}

mongoose.set('strictQuery', false);

const PORT = parseInt(process.env.PORT, 10) || 5000;

mongoose.connect(mongoUri, { family: 4, serverSelectionTimeoutMS: 10000 })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    const server = app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Stop the process using it or set a different PORT in .env.`);
      } else {
        console.error('❌ Server error:', error);
      }
      process.exit(1);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  });