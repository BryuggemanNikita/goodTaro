import { Request, response, Response } from 'express';
import { GigaChatClient } from '../ai/gigachat/GigaChatClient.js';
import { UserArcanDto } from '../ai/model/UserArcanDto.js';
import { teamMemberRepository } from '../repository/teamMember.repository.js';

class AinfoService {
    private client;
    constructor(){
        this.client = new GigaChatClient();
    }

    public async compatibility(req: Request, res: Response) {
        const { firstEmployeeId, secondEmployeeId, teamId } = req.body;
        const recrutierid = res['recruiter'];

        const [firstEmployee, secondEmployee] = await Promise.all([
            teamMemberRepository.findOne({
                relations: {
                    team: true,
                    arcan: true
                },
                where: {
                    id: firstEmployeeId,
                    team: { id: teamId }
                }
            }),
            teamMemberRepository.findOne({
                relations: {
                    team: true,
                    arcan: true
                },
                where: {
                    id: secondEmployeeId,
                    team: { id: teamId }
                }
            })
        ]);

        const firstEmployeeName = firstEmployee.name;
        const secondEmployeeName = secondEmployee.name;
        const firstEmployeeArcan = firstEmployee.arcan.arcan_number;
        const secondEmployeeArcan = secondEmployee.arcan.arcan_number;

        
        const dto1 = new UserArcanDto(firstEmployeeName, firstEmployeeArcan);
        const dto2 = new UserArcanDto(secondEmployeeName, secondEmployeeArcan);

        const result = (await this.client.getSummaryByUserInfo(dto1, dto2)).choices[0].message.content

        return res.status(200).json({ result });
    }
}

export const ainfoService = new AinfoService();
