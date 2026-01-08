import { Request, Response, NextFunction } from 'express';
import { TransformController } from '../../src/controllers/transformController';

describe('TransformController', () => {
  let controller: TransformController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;

  beforeEach(() => {
    controller = new TransformController();
    mockRequest = {
      body: {}
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis()
    };
    mockNext = jest.fn();
  });

  describe('transform', () => {
    it('should transform data and return 200', async () => {
      mockRequest.body = { data: 'I love my dog' };

      await controller.transform(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith('I love my cat');
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should return 400 when data field is missing', async () => {
      mockRequest.body = {};

      await controller.transform(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        error: 'Bad Request',
        message: 'Request body must contain a "data" field'
      });
      expect(mockNext).not.toHaveBeenCalled();
    });

    it('should call next with error when service throws', async () => {
      const manyDogs = Array(1001).fill('dog').join(' ');
      mockRequest.body = { data: manyDogs };

      await controller.transform(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockNext).toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
    });

    it('should handle null data', async () => {
      mockRequest.body = { data: null };

      await controller.transform(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(null);
    });

    it('should handle complex nested objects', async () => {
      mockRequest.body = {
        data: {
          pets: ['dog', 'cat'],
          owner: { name: 'John', pet: 'dog' }
        }
      };

      await controller.transform(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({
        pets: ['cat', 'cat'],
        owner: { name: 'John', pet: 'cat' }
      });
    });
  });
});