import { RepositryFactory } from './repositories.js';
import { ArcanEntity } from '../entities/arcan.js';

export const arcanRepository = RepositryFactory.create<ArcanEntity>(ArcanEntity);