import { arcanService } from '../../servises/arcan.service.js';
import express from 'express';

export const arcanEndpoint = express.Router();

arcanEndpoint.get('/', (req, res, next) => {
    arcanService.getAll(req, res).catch(next);
});
