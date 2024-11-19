import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { TeamEntity } from './team.js';
import { ITeamMember } from '../common/interface/ITeamMember.js';
import { IMyTeam } from '../common/interface/IMyTeam.js';
import { IArcan } from '../common/interface/IArcan.js';
import { ArcanEntity } from './arcan.js';

@Entity({ name: 'member' })
export class TeamMemberEntity implements ITeamMember {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    birthday: Date;

    @Column()
    department: string;

    @Column()
    personal_qualities: string;

    @ManyToOne(() => TeamEntity, (team) => team.members)
    team: IMyTeam;

    @ManyToOne(() => ArcanEntity, (arcan) => arcan.members)
    arcan: IArcan;
}
