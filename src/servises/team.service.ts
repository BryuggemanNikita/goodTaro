import { recruiterRepository } from '../repository/recruiter.repository.js';
import { Request, Response } from 'express';
import { CustomException } from '../common/exception/customException.js';
import { teamRepository } from '../repository/team.repository.js';
import { MyTeamDto } from '../dto/team.dto';
import { IMyTeam } from '../common/interface/IMyTeam.js';
import { verify } from 'jsonwebtoken';
import env from 'dotenv';

env.config();

class TeamService {
    public async createTeam(req, res) {
        const { name, description, recruiterId } = req.body;

        const recruiter = await recruiterRepository
            .findOne({
                relations: {
                    my_teams: true
                },
                where: {
                    id: recruiterId
                }
            })
            .catch(() => {
                throw new CustomException('Somthink went wrong', '400');
            });

        if (!recruiter) {
            throw new CustomException('The recruiter was not found', '404');
        }

        const team = new MyTeamDto(name, description, recruiter);

        await teamRepository.save(team).catch(() => {
            throw new CustomException('Somthink went wrong', '400');
        });
        recruiter.my_teams = [...recruiter.my_teams, team];

        await recruiterRepository.save(recruiter);

        return res.status(200).json({ message: 'successfully' });
    }

    public async getMyTeam(req: Request, res: Response) {
        const recruiterId = await this.getRecrutierId(req).catch(() => {
            throw new CustomException('bad token', '409');
        });

        const recruiter = await recruiterRepository
            .findOne({
                select: {
                    id: true,
                    name: true,
                    surname: true,
                    patronymic: true,
                    email: true,
                    my_teams: true
                },
                relations: {
                    my_teams: true
                },
                where: {
                    id: recruiterId
                }
            })
            .catch((err) => {
                throw new CustomException('Somthink went wrong', '400');
            });

        if (!recruiter) {
            throw new CustomException('The recruiter was not found', '404');
        }
        recruiter.my_teams = await this.getMembersById(recruiter.my_teams);

        res.status(200).json({ message: 'successfully', recruiter });
    }

    private async getMembersById(teams: IMyTeam[]) {
        const my_teams = [];
        for (const team of teams) {
            my_teams.push(
                ...(await teamRepository.find({
                    relations: {
                        members: true
                    },
                    where: {
                        id: team.id
                    }
                }))
            );
        }
        return my_teams;
    }

    private async getRecrutierId(req: Request) {
        const token = req.cookies.Authorization.split(' ')[1];
        let recruiterId = verify(token, process.env.SECRET);
        return (recruiterId = recruiterId['recruiterId']);
    }
}

export const teamService = new TeamService();
