import { Request, Response, NextFunction } from 'express';
import env from 'dotenv';
import { CustomException } from '../common/exception/customException';
import jwt from 'jsonwebtoken';

env.config();

export const isAuthentificated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.Authorization.split(' ')[1];
        if (!token) {
            throw new CustomException('Unauthorized', '401');
        }
        const verifyData = jwt.verify(token, process.env.SECRET);
        const recrutierId = verifyData['recruiterId'];
        res['recruiter'] = recrutierId;
        next();
    } catch (err) {
        res.redirect('/api_goodArcan/auth');
    }
};
