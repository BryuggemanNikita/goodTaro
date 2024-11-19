import { IMyTeam } from '../common/interface/IMyTeam';
import { IRecruiter } from '../common/interface/IRecruiter';
import { ITeamMember } from '../common/interface/ITeamMember';

export class MyTeamDto implements IMyTeam {
    id: number;
    name: string;
    description: string;
    recruiter: IRecruiter;
    members: ITeamMember[];

    constructor(name: string, description: string, recruiter: IRecruiter) {
        this.name = name;
        this.description = description;
        this.recruiter = recruiter;
        this.members = [];
    }
}
