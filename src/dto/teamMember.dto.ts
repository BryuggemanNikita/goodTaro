import { ITeamMember } from '../common/interface/ITeamMember.js';
import { IMyTeam } from '../common/interface/IMyTeam.js';
import { IArcan } from '../common/interface/IArcan.js';

export class TeamMemberDto implements ITeamMember {
    id: number;
    name: string;
    birthday: Date;
    department: string;
    personal_qualities: string;
    team: IMyTeam;
    arcan: IArcan;
    constructor(
        name: string,
        birthday: Date,
        department: string,
        personal_qualities: string,
        team: IMyTeam,
        arcan: IArcan
    ) {
        this.name = name;
        this.birthday = birthday;
        this.department = department;
        this.personal_qualities = personal_qualities;
        this.team = team;
        this.arcan = arcan;
    }
}
