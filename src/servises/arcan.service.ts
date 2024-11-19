import { Request, Response } from 'express';
import { CustomException } from '../common/exception/customException.js';
import { arcanRepository } from '../repository/arcan.repository.js';
import { ArcanDto } from '../dto/arcan.dto.js';

class ArcanService {
    constructor() {}
    public async create(req: Request, res: Response) {
        const { name, arcan_number } = req.body;
        const arcan = new ArcanDto(name, arcan_number);
        await arcanRepository.save(arcan).catch(() => {
            throw new CustomException('failed to add to the database', '400');
        });
        res.status(200).json({ message: 'successfully' });
    }

    public async getAll(req: Request, res: Response) {
        const arcanId = Number(req.query.id);
        if (!arcanId) {
            const arcans = await arcanRepository.find();
            return res.status(200).json({ message: 'successfully', arcans });
        }
        const arcan = await arcanRepository.findOneBy({ id: arcanId });
        res.status(200).json({ message: 'successfully', arcan });
    }

    public async getById(req: Request, res: Response) {
        const arcanId = req.query;
        console.log(arcanId);

        const arcans = await arcanRepository.find();
        console.log(arcans);
        console.log(123);
    }
}

export const arcanService = new ArcanService();
