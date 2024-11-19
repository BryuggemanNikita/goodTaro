import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { IMyTeam } from '../common/interface/IMyTeam.js';
import { ITeamMember } from '../common/interface/ITeamMember.js';
import { IRecruiter } from '../common/interface/IRecruiter.js';
import { RecruiterEntity } from './recruiter.js';
import { TeamMemberEntity } from './teamMember.js';

@Entity({ name: 'team' })
export class TeamEntity implements IMyTeam {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToOne(() => RecruiterEntity, (recruiter) => recruiter.my_teams)
    recruiter: IRecruiter;

    @OneToMany(() => TeamMemberEntity, (member) => member.team)
    members: ITeamMember[];
}
