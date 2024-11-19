import { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
import { CustomException } from '../common/exception/customException';

env.config();

export const isAuthentificated = (req: Request, res, next: NextFunction) => {
    try {
        const token = req.cookies.Authorization.split(' ')[1];
        if (!token) {
            throw new CustomException('Unauthorized', '401');
        }
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
