import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import categoryRoutes from './routes/categories';
import listingRoutes from './routes/listings';
import locationRoutes from './routes/locations';
import paymentRoutes from './routes/payments';
import moderationRoutes from './routes/moderation';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: [
    process.env.CLIENT_URL || 'http://localhost:5173',
    process.env.ADMIN_URL || 'http://localhost:5174',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());

// Base Health Check
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Flacon Marketplace API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Feature Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/listings', listingRoutes);
app.use('/api/locations', locationRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/moderation', moderationRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Flacon API server running on port ${PORT}`);
});

