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

// Dynamic CORS configuration accommodating local dev, preview URLs, and custom domains
app.use(cors({
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    if (!origin) return callback(null, true);
    if (
      origin.includes('localhost') || 
      origin.includes('127.0.0.1') || 
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    const allowed = [
      process.env.CLIENT_URL,
      process.env.ADMIN_URL
    ].filter(Boolean) as string[];
    if (allowed.includes(origin)) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// Main API Router
const apiRouter = express.Router();

// Health Check
apiRouter.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Flacon Marketplace API',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// Root API Info
apiRouter.get('/', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    service: 'Flacon Marketplace API',
    endpoints: [
      '/health',
      '/v1/auth',
      '/categories',
      '/listings',
      '/locations',
      '/payments',
      '/moderation'
    ]
  });
});

// Feature Routes
apiRouter.use('/v1/auth', authRoutes);
apiRouter.use('/categories', categoryRoutes);
apiRouter.use('/listings', listingRoutes);
apiRouter.use('/locations', locationRoutes);
apiRouter.use('/payments', paymentRoutes);
apiRouter.use('/moderation', moderationRoutes);

// Mount router under both /api and / so it works regardless of Vercel path prefix rewriting
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Start server when run directly (local development)
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 Flacon API server running on port ${PORT}`);
  });
}

export default app;
