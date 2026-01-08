import express, { Application } from 'express';
import { JsonTransformerController } from './controllers/jsonTransformerController';

export function createApp(): Application {
  const app = express();

  // Middleware
  app.use(express.json());

  // Routes
  const transformController = new JsonTransformerController();
  app.post('/transform', transformController.transform);

  return app;
}