import express, { Application } from 'express';
import { JsonTransformerController } from './controllers/jsonTransformerController';
import { errorHandler } from './middleware/errorHandler';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  const transformController = new JsonTransformerController();
  app.post('/transform', transformController.transform);

  // Error handling
  app.use(errorHandler);

  return app;
}