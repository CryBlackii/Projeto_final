import { getCustomRepository } from "typeorm";
import Game from "../typeorm/entities/Game";
import GamesRepository from "../typeorm/repositories/GamesRepository";
import AppError from "@shared/errors/AppError";

interface IRequest {
    id: string;
    nome: string;
    genero: string;
    data_lancamento: Date;
    preco: number;
    descricao: string;
    developer_id: string;
}

export default class UpdateGameService {
    public async execute({ id, nome, genero, data_lancamento, preco, descricao, developer_id }: IRequest): Promise<Game> {
        const gamesRepository = getCustomRepository(GamesRepository);
        const game = await gamesRepository.findOne(id);
        
        if (!game) {
            throw new AppError('Game não foi encontrado');
        }

        const gameExists = await gamesRepository.findByNome(nome);
        if (gameExists && nome !== game.nome) {
            throw new AppError('Já existe um game com esse nome');
        }

        game.nome = nome;
        game.genero = genero;
        game.data_lancamento = data_lancamento;
        game.preco = preco;
        game.descricao = descricao;
        game.developer = { id: developer_id } as any; // Atualiza a relação com o developer

        await gamesRepository.save(game);
        return game;
    }
}