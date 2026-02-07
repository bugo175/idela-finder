import { Request, Response, NextFunction } from 'express';

export function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction) {
  console.error('Error:', err.message);

  const statusCode = (err as any).statusCode || 500;
  const message = statusCode === 500 ? 'Errore interno del server' : err.message;

  res.status(statusCode).json({
    success: false,
    error: message,
  });
}
