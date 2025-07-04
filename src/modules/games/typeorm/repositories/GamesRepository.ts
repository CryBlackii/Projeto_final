import { EntityRepository, Repository } from "typeorm";
import Game from "../entities/Game";

@EntityRepository(Game)
export default class GamesRepository extends Repository<Game> {
  public async findById(id: string): Promise<Game | undefined> {
    return this.findOne({
      where: {id},
      relations: ["developer"]
    });
  }

  public async findByNome(nome: string): Promise<Game | undefined> {
    return this.findOne({
      where: {nome},
      relations: ["developer"]
    });
  }

  public async findByGenero(genero: string): Promise<Game[] | undefined> {
    return this.find({
      where: {genero},
      relations: ["developer"]
    });
  }

  public async findByDataLancamento(data: Date): Promise<Game[] | undefined> {
    return this.find({
      where: {data_lancamento: data},
      relations: ["developer"]
    });
  }

  public async findByPreco(preco: number): Promise<Game[] | undefined> {
    return this.find({
      where: {preco},
      relations: ["developer"]
    });
  }

  public async findByDescricao(descricao: string): Promise<Game[] | undefined> {
    return this.find({
      where: {descricao},
      relations: ["developer"]
    });
  }

  public async findByDeveloper(developer_id: string): Promise<Game[] | undefined> {
    return this.find({
      where: {developer_id},
      relations: ["developer"]
    });
  }
}