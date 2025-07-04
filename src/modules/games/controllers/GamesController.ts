import { NextFunction, Request, Response } from "express";
import CreateGameService from "../services/CreateGameServices";
import ListGameService from "../services/ListGameService";
import DeleteGameService from "../services/DeleteGameServices";
import UpdateGameService from "../services/UpdateGameServices";
import ShowGameService from "../services/ShowGameServices";

export default class GamesController {
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const listGame = new ListGameService();
            const games = await listGame.execute();
            return response.json(games);
        } catch(err) {
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = request.params;
            const showGame = new ShowGameService();
            const game = await showGame.execute({id});
            return response.json(game);
        } catch(err) {
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {nome, genero, data_lancamento, preco, descricao, developer_id} = request.body;
            const createGame = new CreateGameService();
            const game = await createGame.execute({
                nome, 
                genero, 
                data_lancamento, 
                preco, 
                descricao,
                developer_id
            });
            return response.json(game);
        } catch(err) {
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {nome, genero, data_lancamento, preco, descricao, developer_id} = request.body;
            const {id} = request.params;
            const updateGame = new UpdateGameService();
            const game = await updateGame.execute({
                id,
                nome,
                genero,
                data_lancamento,
                preco,
                descricao,
                developer_id
            });
            return response.json(game);
        } catch(err) {
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const {id} = request.params;
            const deleteGame = new DeleteGameService();
            await deleteGame.execute({id});
            return response.json([]);
        } catch(err) {
            next(err);
        }
    }
}