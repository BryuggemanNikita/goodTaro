import { Request, Response, NextFunction } from 'express';
import { logger } from '../common/logger/logger.js';

export function logHttpRequest(req: Request, res: Response, next: NextFunction) {
    logger.info(`method - ${req.method}, url - ${req.path}`);
    next();
}
