import express, { Application } from 'express';
import { TransformController } from './controllers/transformController';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  const transformController = new TransformController();
  app.post('/transform', transformController.transform);

  return app;
}