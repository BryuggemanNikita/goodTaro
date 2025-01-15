import { Router, Response, Request, NextFunction } from 'express';
import { ainfoService } from '../../servises/ainfo.service.js';

export const ainfoEndpoint = Router();

ainfoEndpoint.get('/employees', (req: Request, res: Response, next: NextFunction) => {
    ainfoService.compatibility(req, res).catch(next);
});
