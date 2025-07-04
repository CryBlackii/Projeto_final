import { getCustomRepository } from "typeorm";
import Game from "../typeorm/entities/Game";
import GamesRepository from "../typeorm/repositories/GamesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    nome: string;
    genero: string;
    data_lancamento: Date;
    preco: number;
    descricao: string;
    developer_id: string;
}

export default class CreateGameService {
    public async execute({ nome, genero, data_lancamento, preco, descricao, developer_id }: IRequest): Promise<Game> {
        const gamesRepository = getCustomRepository(GamesRepository);
        
        const gameAlreadyExists = await gamesRepository.findByNome(nome);
        if (gameAlreadyExists) {
            throw new AppError('Esse jogo já existe ;/');
        }

        const game = gamesRepository.create({
            nome,
            genero,
            data_lancamento,
            preco,
            descricao,
            developer: { id: developer_id }
        });

        await gamesRepository.save(game);
        return game;
    }
}