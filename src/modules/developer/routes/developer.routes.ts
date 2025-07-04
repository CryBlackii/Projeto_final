import { Router } from "express";
import DeveloperController from "../controllers/DeveloperController";
import {celebrate, Joi, Segments} from 'celebrate';

const developersRouter = Router();
const developerController = new DeveloperController();

developersRouter.get('/', async(req, res, next) => {
  try{
    await developerController.index(req, res, next);
  }catch(err){
    next(err);
  }
});

developersRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
async(req, res, next) => {
  try{
    await developerController.show(req, res, next);
  }catch(err){
    next(err);
  }
});

developersRouter.post('/', celebrate({
  [Segments.BODY]: {
      name: Joi.string().required(),
      pais_de_origem: Joi.string().required(),
      fundacao: Joi.date().required(),
      sede: Joi.string().required(),
      site: Joi.string().uri().required(),
      games: Joi.array().items(Joi.string().uuid()).optional()
  }
}),
async(req, res, next) => {
  try{
    await developerController.create(req, res, next);
  }catch(err){
    next(err);
  }
});

developersRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {id: Joi.string().uuid().required()},
  [Segments.BODY]: {
    name: Joi.string().required(),
      pais_de_origem: Joi.string().required(),
      fundacao: Joi.date().required(),
      sede: Joi.string().required(),
      site: Joi.string().uri().required(),
      games: Joi.array().items(Joi.string().uuid()).optional()
  }
}),
async(req, res, next) => {
  try{
    await developerController.update(req, res, next);
  }catch(err) {
    next(err);
  }
});

developersRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {id: Joi.string().uuid().required()}
}),
async (req, res, next) => {
  try{
    await developerController.delete(req, res, next);
  }catch(err){
    next(err);
  }
});
  
export default developersRouter;