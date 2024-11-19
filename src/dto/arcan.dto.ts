import { IArcan } from '../common/interface/IArcan.js';
import { ITeamMember } from '../common/interface/ITeamMember.js';

export class ArcanDto implements IArcan {
    id: number;
    name: string;
    arcan_number: number;

    constructor(name: string, arcan_number: number) {
        this.name = name;
        this.arcan_number = arcan_number;
    }
}
