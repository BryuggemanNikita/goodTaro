import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { IRecruiter } from '../common/interface/IRecruiter.js';
import { TeamEntity } from './team.js';
import { IMyTeam } from '../common/interface/IMyTeam.js';

@Entity({ name: 'recrutier' })
export class RecruiterEntity implements IRecruiter {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    patronymic: string;

    @Column({ unique: true })
    email: string;

    @Column()
    hashed_password: string;

    @OneToMany(() => TeamEntity, (team) => team.recruiter)
    my_teams: IMyTeam[];
}
