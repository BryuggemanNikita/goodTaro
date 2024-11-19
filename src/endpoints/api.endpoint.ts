import { teamMemberEndpoint } from './teamMember.endpoint.js';
import { isAuthentificated } from '../middleware/isAuthentificated.js';
import { engineEndpoint } from './engine.endpoint.js';
import { arcanEndpoint } from './arcan.endpoint.js';
import { teamEndpoint } from './team.endpoint.js';
import { authEndpoint } from './auth.endpoint.js';
import express from 'express';

export const apiEndpoint = express.Router();

apiEndpoint.use('/auth', authEndpoint);
apiEndpoint.use(isAuthentificated);
apiEndpoint.use('/team', teamEndpoint);
apiEndpoint.use('/teamMember', teamMemberEndpoint);
apiEndpoint.use('/arcan', arcanEndpoint);
apiEndpoint.use('/', engineEndpoint);
