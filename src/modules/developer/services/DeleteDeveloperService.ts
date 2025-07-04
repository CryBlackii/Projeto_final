import { getCustomRepository } from "typeorm";
import Developer from "../typeorm/entities/Developer";
import DeveloperRepository from "../typeorm/repositories/DeveloperRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

export default class DeleteDeveloperService {
    public async execute({id}: IRequest): Promise<void> {
        const developerRepository = getCustomRepository(DeveloperRepository);
        const developer = await developerRepository.findOne(id, {
            relations: ["games"]
        });
        if(!developer){
            throw new AppError('Developer n foi encontrado');
        }
        await developerRepository.remove(developer);
    }
}