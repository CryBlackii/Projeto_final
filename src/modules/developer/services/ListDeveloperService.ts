import { getCustomRepository } from "typeorm";
import Developer from "../typeorm/entities/Developer";
import DeveloperRepository from "../typeorm/repositories/DeveloperRepository";

export default class ListDeveloperService{
    public async execute() : Promise<Developer[]>{
        const developerRepository = getCustomRepository(DeveloperRepository);
        const developer = await developerRepository.find({
            relations: ["games"]
        });
        return developer;
    }
}