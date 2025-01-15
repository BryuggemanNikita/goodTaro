import { teamMemberRepository } from '../repository/teamMember.repository.js';
import { Request, Response } from 'express';
import { CustomException } from '../common/exception/customException.js';
import { arcanRepository } from '../repository/arcan.repository.js';
import { teamRepository } from '../repository/team.repository.js';
import { TeamMemberDto } from '../dto/teamMember.dto.js';
import { getArcan } from '../common/arcan/getArcan.js';

class TeamMemberService {
    public async addMember(req: Request, res: Response) {
        const { name, birthday, department, personal_qualities, teamId } = req.body;

        const team = await teamRepository
            .findOne({
                relations: {
                    members: true
                },
                where: {
                    id: teamId
                }
            })
            .catch(() => {
                throw new CustomException('Somthink went wrong', '400');
            });

        if (!team) {
            throw new CustomException('The team was not found', '404');
        }

        const numberArcan: number = getArcan(birthday);

        const arcan = await arcanRepository.findOneBy({ arcan_number: numberArcan }).catch(() => {
            throw new CustomException('Somthink went wrong', '400');
        });
        if (!arcan) throw new CustomException('The arcan was not found', '404');

        const timeStrapBirthday = new Date(birthday.split('.').reverse().join('-'));
        const teamMember = new TeamMemberDto(
            name,
            timeStrapBirthday,
            department,
            personal_qualities,
            team,
            arcan
        );

        await teamMemberRepository.save(teamMember).catch(() => {
            throw new CustomException('The member could not be saved', '400');
        });

        team.members = [...team.members, teamMember];

        await teamRepository.save(team).catch(() => {
            throw new CustomException('Somthink went wrong', '400');
        });

        return res.status(200).json({ message: 'successfully' });
    }

    public getMembersId(req: Request, res: Response) {
        
    }
}

export const teamMemberService = new TeamMemberService();
