import { teamMemberService } from '../../servises/teamMember.service.js';
import { NextFunction, Request, Response } from 'express';
import express from 'express';

export const teamMemberEndpoint = express.Router();

teamMemberEndpoint.post('/create', (req: Request, res: Response, next: NextFunction) => {
    teamMemberService.addMember(req, res).catch(next);
});
