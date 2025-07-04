import { getCustomRepository } from "typeorm";
import Developer from "../typeorm/entities/Developer";
import DeveloperRepository from "../typeorm/repositories/DeveloperRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    name: string;
    pais_de_origem: string;
    fundacao: Date;
    sede: string;
    site: string;
    games?: string[];
}

export default class CreateDeveloperService {
    public async execute({ name, pais_de_origem, fundacao, sede, site, games }: IRequest): Promise<Developer> {
        const developerRepository = getCustomRepository(DeveloperRepository);
        
        const developerExists = await developerRepository.findByName(name);
        if (developerExists) {
            throw new AppError('Já existe um developer com esse nome');
        }

        const developer = developerRepository.create({
            name,
            pais_de_origem,
            fundacao,
            sede,
            site,
            games: games ? games.map(id => ({ id })) : []
        });

        await developerRepository.save(developer);
        return developer;
    }
}