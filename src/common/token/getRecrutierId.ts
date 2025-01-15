import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { CustomException } from '../exception/customException';

export async function getRecrutierId(req: Request) {
    try {
        const token = req.cookies.Authorization.split(' ')[1];
        let recruiterId = verify(token, process.env.SECRET);
        return (recruiterId = recruiterId['recruiterId']);
    } catch (err) {
        throw new CustomException('Unauthorized', '401');
    }
}
