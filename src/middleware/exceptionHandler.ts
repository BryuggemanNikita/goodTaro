import { Request, Response, NextFunction } from 'express';
import { logger } from '../common/logger/logger.js';

export function exceptionHandler(err, req: Request, res: Response, next: NextFunction) {
    const { url, method } = req;
    const status = err.status || '500';
    const message = err.message;
    const error = err.error;
    logger.error({
        message,
        status,
        url,
        method
    });
    if (error) {
        logger.error({ error });
    }
    res.status(status).json(message);
}
