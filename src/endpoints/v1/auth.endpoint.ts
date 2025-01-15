import { Request, Response, NextFunction } from 'express';
import { authService } from '../../servises/auth.service.js';
import express from 'express';

export const authEndpoint = express.Router();

authEndpoint.post('/register', (req: Request, res: Response, next: NextFunction) => {
    authService.register(req, res).catch(next);
});

authEndpoint.post('/login', (req: Request, res: Response, next: NextFunction) => {
    authService.login(req, res).catch(next);
});

authEndpoint.post('/change-password', (req: Request, res: Response, next: NextFunction) => {
    authService.chengePassword(req, res).catch(next);
});

authEndpoint.post('/logout', (req: Request, res: Response, next: NextFunction) => {
    authService.logout(req, res).catch(next);
});
