import { Request, Response, NextFunction } from 'express';
import { teamService } from '../../servises/team.service.js';
import express from 'express';

export const teamEndpoint = express.Router();

teamEndpoint.post('/create', (req: Request, res: Response, next: NextFunction) => {
    teamService.createTeam(req, res).catch(next);
});

teamEndpoint.get('/myTeam', (req: Request, res: Response, next: NextFunction) => {
    teamService.getMyTeams(req, res).catch(next);
});

teamEndpoint.get('/getById', (req: Request, res: Response, next: NextFunction) => {
    teamService.getTeamById(req, res).catch(next);
});
