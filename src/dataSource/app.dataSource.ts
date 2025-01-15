import { TeamMemberEntity } from '../entities/teamMember.js';
import { CustomException } from '../common/exception/customException.js';
import { RecruiterEntity } from '../entities/recruiter.js';
import { DataSource } from 'typeorm';

import { ArcanEntity } from '../entities/arcan.js';
import { TeamEntity } from '../entities/team.js';
import { ArcanDto } from '../dto/arcan.dto.js';
import fs from 'fs';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5433,
    username: 'postgres',
    password: 'root',
    database: 'postgres',
    synchronize: true,
    logging: true,
    entities: [RecruiterEntity, ArcanEntity, TeamEntity, TeamMemberEntity],
    subscribers: [],
    migrations: []
});

AppDataSource.initialize()
    .then((dataSource) => {
        const repo = dataSource.getRepository(ArcanEntity);
        const data = JSON.parse(fs.readFileSync(__dirname + '/../../arcans.json').toString());
        for (const arcan of data) {
            const arcanDto = new ArcanDto(arcan.name, arcan.arcan_number);
            repo.save(arcanDto).catch(() => {});
        }
    })
    .catch((error) => console.log(error));
