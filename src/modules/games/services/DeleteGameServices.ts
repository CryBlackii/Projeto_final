import { getCustomRepository } from "typeorm";
import Game from "../typeorm/entities/Game";
import GamesRepository from "../typeorm/repositories/GamesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest{
    id: string;
}

export default class DeleteGameService{
    public async execute({id}: IRequest): Promise<void> {
        const gamesRepository = getCustomRepository(GamesRepository);
        const game = await gamesRepository.findOne(id);
        if(!game){
            throw new AppError('Game não foi encontrado');
        }
        await gamesRepository.remove(game);
    }
}