import { compareSync, hashSync } from 'bcryptjs';
import { recruiterRepository } from '../repository/recruiter.repository.js';
import { Request, Response } from 'express';
import { CustomException } from '../common/exception/customException.js';
import { RecruiterDto } from '../dto/recruiter.dto.js';
import { getRecrutierId } from '../common/token/getRecrutierId.js';
import jwt from 'jsonwebtoken';
import env from 'dotenv';

env.config();

class AuthService {
    public async register(req: Request, res: Response) {
        const { name, surname, patronymic, email, password } = req.body;

        console.log(name, surname, patronymic, email, password);

        const recruiterTeams = [];

        const hashed_password = hashSync(password, 9);
        const recruiter = new RecruiterDto(
            name,
            surname,
            patronymic,
            email,
            hashed_password,
            recruiterTeams
        );

        await recruiterRepository.save(recruiter).catch((err) => {
            throw new CustomException('Recruiter with this email already exists', '409');
        });

        return res.status(200).json({ message: 'successfully' });
    }

    public async login(req: Request, res: Response) {
        const { email, password } = req.body;

        const recruiter = await recruiterRepository.findOneBy({ email }).catch((err) => {
            throw new CustomException('Somthink went wrong', '400');
        });
        if (!recruiter) throw new CustomException('The recruiter was not found', '404');

        const hashed_password = recruiter.hashed_password;
        const isTruePassword = compareSync(password, hashed_password);
        if (!isTruePassword) throw new CustomException('the email or password is incorrect', '401');

        let accessToken = await AuthService.generateAccessToken(recruiter.id);
        accessToken = `Bearer ${accessToken}`;

        res.cookie('Authorization', accessToken, {
            httpOnly: true
        });

        return res.status(200).json({ message: 'successfully', token: accessToken });
    }

    public async chengePassword(req: Request, res: Response) {
        const recrutierId = await getRecrutierId(req);
        const recruiter = await recruiterRepository.findOneBy({ id: recrutierId }).catch((err) => {
            throw new CustomException('Somthink went wrong', '400');
        });
        if (!recruiter) throw new CustomException('The recruiter was not found', '404');
        const { password } = req.body;
        const hashed_password = hashSync(password, 9);
        recruiter.hashed_password = hashed_password;
        await recruiterRepository.save(recruiter).catch((err) => {
            throw new CustomException('Еhe password could not be updated', '400');
        });
        return res.status(200).json({ message: 'successfully' });
    }

    public async logout(req: Request, res: Response) {
        res.cookie('Authorization', '', {
            httpOnly: true
        });
        return res.status(200).json({ message: 'successfully' });
    }

    private static async generateAccessToken(recruiterId) {
        const payload = { recruiterId };
        const secretWord = process.env.SECRET;
        return jwt.sign(payload, secretWord, { expiresIn: '15m' });
    }
}

export const authService = new AuthService();
