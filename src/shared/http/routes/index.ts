import developersRouter from "@modules/developer/routes/developer.routes";
import gamesRouter from "@modules/games/routes/games.routes";
import sessionsRouter from "@modules/users/routes/sessions.routes";
import usersRouter from "@modules/users/routes/users.routes";
import { Router } from "express";

const routes = Router();
routes.use('/developer', developersRouter);
routes.use('/games', gamesRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

routes.get('/', (request, response) =>{
    response.json({message: 'Hello Dev!'});
    return;
})

export default routes;