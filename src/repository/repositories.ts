import { AppDataSource } from '../dataSource/app.dataSource.js';
import { EntityTarget } from 'typeorm';
import { Repository } from 'typeorm';

export abstract class RepositryFactory {
    public static create<E>(entity: EntityTarget<E>): Repository<E> {
        return AppDataSource.getRepository(entity);
    }
}
