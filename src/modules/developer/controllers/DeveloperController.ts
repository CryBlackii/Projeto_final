import DeleteDeveloperService from "../services/DeleteDeveloperService";
import CreateDeveloperService from "../services/CreateDeveloperService";
import ListDeveloperService from "../services/ListDeveloperService";
import UpdateDeveloperService from "../services/UpdateDeveloperService";
import ShowDeveloperService from "../services/ShowDeveloperService";
import { Request, Response, NextFunction } from "express";

interface IRequestCreate {
    name: string;
    pais_de_origem: string;
    fundacao: Date;
    sede: string;
    site: string;
    games?: string[];
}

interface IRequestUpdate {
    id: string;
    name: string;
    pais_de_origem: string;
    fundacao: Date;
    sede: string;
    site: string;
    games?: string[];
}

export default class DeveloperController{
    public async index(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const listDeveloper = new ListDeveloperService();
            const developer = await listDeveloper.execute();
            return response.json(developer);
        }catch(err){
            next(err);
        }
    }

    public async show(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const {id} = request.params;
            const showDeveloper = new ShowDeveloperService();
            const developer = await showDeveloper.execute({id});
            return response.json(developer);
        }catch(err){
            next(err);
        }
    }

    public async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const{name, pais_de_origem, fundacao, sede, site, games} = request.body;
            const createDeveloper = new CreateDeveloperService();
            const developer = await createDeveloper.execute({name, pais_de_origem, fundacao, sede, site, games});
            return response.json(developer);
        }catch(err){
            next(err);
        }
    }

    public async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const{name, pais_de_origem, fundacao, sede, site, games} = request.body;
            const{id} = request.params;
            const updateDeveloper = new UpdateDeveloperService();
            const developer = await updateDeveloper.execute({id, name, pais_de_origem, fundacao, sede, site, games});
            return response.json(developer);
        }catch(err){
            next(err);
        }
    }

    public async delete(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try{
            const{id} = request.params;
            const deleteDeveloper = new DeleteDeveloperService();
            await deleteDeveloper.execute({id});
            return response.json([]);
        }catch(err){
            next(err);
        }
    }
}