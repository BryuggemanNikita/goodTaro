import { RepositryFactory } from './repositories.js';
import { RecruiterEntity } from '../entities/recruiter.js';

export const recruiterRepository = RepositryFactory.create<RecruiterEntity>(RecruiterEntity);
