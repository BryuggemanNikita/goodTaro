import { IRecruiter } from '../common/interface/IRecruiter.js';
import { IMyTeam } from '../common/interface/IMyTeam.js';

export class RecruiterDto implements IRecruiter {
    id: number;
    name: string;
    surname: string;
    patronymic: string;
    email: string;
    hashed_password: string;
    my_teams: IMyTeam[];

    constructor(
        name: string,
        surname: string,
        patronymic: string,
        email: string,
        hashed_password: string,
        my_teams: IMyTeam[]
    ) {
        this.name = name;
        this.surname = surname;
        this.patronymic = patronymic;
        this.email = email;
        this.hashed_password = hashed_password;
        this.my_teams = my_teams;
    }

    public getPayload(){
        const payload = {
            name: this.name,
            surname: this.surname,
            patronymic: this.patronymic,
            email: this.email,
            my_teams: this.my_teams,
        }
    }
}
