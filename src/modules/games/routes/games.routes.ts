import { Router } from "express";
import { celebrate, Joi, Segments } from "celebrate";
import GamesController from "../controllers/GamesController";

const gamesRouter = Router();
const gamesController = new GamesController();

gamesRouter.get('/', async(req, res, next) => {
  try {
    await gamesController.index(req, res, next);
  } catch(err) {
    next(err);
  }
});

gamesRouter.get('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
async(req, res, next) => {
  try {
    await gamesController.show(req, res, next);
  } catch(err) {
    next(err);
  }
});

gamesRouter.post('/', celebrate({
  [Segments.BODY]: {
    nome: Joi.string().required(),
    genero: Joi.string().required(),
    data_lancamento: Joi.date().required(),
    preco: Joi.number().min(0).precision(2).required(),
    descricao: Joi.string().required(),
    developer_id: Joi.string().uuid().required()
  }
}),
async(req, res, next) => {
  try {
    await gamesController.create(req, res, next);
  } catch(err) {
    next(err);
  }
});

gamesRouter.put('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  },
  [Segments.BODY]: {
    nome: Joi.string().required(),
    genero: Joi.string().required(),
    data_lancamento: Joi.date().required(),
    preco: Joi.number().min(0).precision(2).required(),
    descricao: Joi.string().required(),
    developer_id: Joi.string().uuid().required()
  }
}),
async(req, res, next) => {
  try {
    await gamesController.update(req, res, next);
  } catch(err) {
    next(err);
  }
});

gamesRouter.delete('/:id', celebrate({
  [Segments.PARAMS]: {
    id: Joi.string().uuid().required()
  }
}),
async(req, res, next) => {
  try {
    await gamesController.delete(req, res, next);
  } catch(err) {
    next(err);
  }
});

export default gamesRouter;