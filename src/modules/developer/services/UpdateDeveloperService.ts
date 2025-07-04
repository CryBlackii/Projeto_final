import { getCustomRepository } from "typeorm";
import Developer from "../typeorm/entities/Developer";
import DeveloperRepository from "../typeorm/repositories/DeveloperRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    name: string;
    pais_de_origem: string;
    fundacao: Date;
    sede: string;
    site: string;
    games?: string[];
}

export default class UpdateDeveloperService {
    public async execute({ id, name, pais_de_origem, fundacao, sede, site, games }: IRequest): Promise<Developer> {
        const developerRepository = getCustomRepository(DeveloperRepository);
        const developer = await developerRepository.findOne(id, {
            relations: ["games"]
        });
        
        if (!developer) {
            throw new AppError('Developer não encontrado');
        }

        const developerExists = await developerRepository.findByName(name);
        if (developerExists && developerExists.id !== id) {
            throw new AppError('Já existe um developer com esse nome');
        }

        developer.name = name;
        developer.pais_de_origem = pais_de_origem;
        developer.fundacao = fundacao;
        developer.sede = sede;
        developer.site = site;
        
        if (games) {
            developer.games = games.map(id => ({ id })) as any;
        }

        await developerRepository.save(developer);
        return developer;
    }
}