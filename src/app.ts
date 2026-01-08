import express, { Application } from 'express';
import rateLimit from 'express-rate-limit';
import { JsonTransformerController } from './controllers/jsonTransformerController';
import { errorHandler } from './middleware/errorHandler';
import { config } from './config';

export function createApp(): Application {
  const app = express();

  // Rate limiting middleware - protect against heavy traffic
  const limiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: {
      error: 'Too Many Requests',
      message: 'Too many requests from this IP, please try again later.'
    },
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
  });

  // Middleware
  app.use(express.json({ limit: '10mb' })); // Add size limit for JSON payloads
  app.use(limiter);

  // Routes
  const transformController = new JsonTransformerController();
  app.post('/transform', transformController.transform);

  // Error handling
  app.use(errorHandler);

  return app;
}