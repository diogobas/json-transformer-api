import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('Error:', error);

  // Handle JSON parsing errors
  if (error instanceof SyntaxError && 'body' in error) {
    res.status(400).json({
      error: 'Bad Request',
      message: 'Invalid JSON in request body'
    });
    return;
  }

  // Handle replacement limit errors
  if (error.message.includes('Replacement limit exceeded')) {
    res.status(400).json({
      error: 'Bad Request',
      message: error.message
    });
    return;
  }

  // Handle all other errors
  res.status(500).json({
    error: 'Internal Server Error',
    message: 'An unexpected error occurred'
  });
};