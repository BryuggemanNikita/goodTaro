import { RepositryFactory } from './repositories.js';
import { TeamEntity } from '../entities/team.js';

export const teamRepository = RepositryFactory.create<TeamEntity>(TeamEntity);
