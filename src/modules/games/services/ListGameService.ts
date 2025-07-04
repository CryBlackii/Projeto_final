import { getCustomRepository} from "typeorm";
import Game from "../typeorm/entities/Game";
import GamesRepository from "../typeorm/repositories/GamesRepository";

export default class ListGameService{
    public async execute(): Promise<Game[]> {
        const gamesRepository = getCustomRepository(GamesRepository);
        const games = await gamesRepository.find({
            relations: ["developer"]
        });
        return games;
    }
}