import { EntityRepository, Repository } from "typeorm";
import Developer from "../entities/Developer";

@EntityRepository(Developer)
export default class DeveloperRepository extends Repository<Developer>{

    public async findByName(name: string): Promise<Developer | undefined>{
        const developer = this.findOne({
            where: { name },
            relations: ["games"]
        })
        return developer;
    }
}