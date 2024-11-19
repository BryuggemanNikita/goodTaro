import { RepositryFactory } from './repositories.js';
import { TeamMemberEntity } from '../entities/teamMember.js';

export const teamMemberRepository = RepositryFactory.create<TeamMemberEntity>(TeamMemberEntity);
