import { getCustomRepository } from "typeorm";
import Game from "../typeorm/entities/Game";
import GamesRepository from "../typeorm/repositories/GamesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

export default class ShowGameService{
    public async execute({id}: IRequest): Promise<Game> {
        const gamesRepository = getCustomRepository(GamesRepository);
        const game = await gamesRepository.findOne(id, {
            relations: ["developer"]
        });
        if (!game){
            throw new AppError('Game não foi encontrado');
        }
        return game;
    }
}