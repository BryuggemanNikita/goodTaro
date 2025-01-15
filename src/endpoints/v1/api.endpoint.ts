import { teamMemberEndpoint } from '../v1/teamMember.endpoint.js';
import { isAuthentificated } from '../../middleware/isAuthentificated.js';
import { engineEndpoint } from '../v1/engine.endpoint.js';
import { arcanEndpoint } from '../v1/arcan.endpoint.js';
import { teamEndpoint } from '../v1/team.endpoint.js';
import { authEndpoint } from '../v1/auth.endpoint.js';
import { ainfoEndpoint } from './ainfo.endpoint.js';
import express from 'express';

export const v1 = express.Router();

v1.use('', engineEndpoint);
v1.use('/auth', authEndpoint);
v1.use(isAuthentificated);
v1.use('/team', teamEndpoint);
v1.use('/teamMember', teamMemberEndpoint);
v1.use('/info', ainfoEndpoint);
v1.use('/arcan', arcanEndpoint);
