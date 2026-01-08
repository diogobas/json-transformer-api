import { Request, Response, NextFunction } from 'express';
import { JsonTransformerService } from '../services/jsonTransformerService';

export class JsonTransformerController {
  private transformerService: JsonTransformerService;

  constructor() {
    this.transformerService = new JsonTransformerService(1000);
  }

  transform = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { data } = req.body;

      if (data === undefined) {
        res.status(400).json({
          error: 'Bad Request',
          message: 'Request body must contain a "data" field'
        });
        return;
      }

      const result = this.transformerService.transform(data);

      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  };
}