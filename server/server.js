import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from '@sentry/node';
import { clerkWebhooks } from './controllers/webhooks.js';
import companyRoutes from './routes/companyRoutes.js';
import connectCloudinary from './config/cloudinary.js';
import jobRoutes from './routes/jobRoutes.js'

// INITIALIZE EXPRESS
const app = express();

// CONNECT TO MONGODB
await connectDB();
await connectCloudinary();

// =============================
// SENTRY INITIALIZATION
// =============================
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
});
Sentry.setupExpressErrorHandler(app);

// MIDDLEWARE

// IMPORTANT: For Clerk webhooks, we must parse the raw body, not JSON first
app.use(
  express.json({
    verify: (req, res, buf) => {
      req.rawBody = buf.toString(); // Save raw body for Svix verification
    },
  })
);

app.use(cors());

// ROUTES
app.get('/', (req, res) => res.send('API Working'));
app.get('/debug-sentry', () => {
  throw new Error('My first Sentry error!');
});

// Clerk webhook route
app.post('/webhooks', clerkWebhooks);

// Company routes
app.use('/api/company', companyRoutes);
app.use('/api/jobs', jobRoutes)


// START SERVER

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
