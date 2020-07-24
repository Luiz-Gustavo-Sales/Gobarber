import { Router } from "express";

const routes = new Router();
//importando controller para cadastrar
import UseController from "./app/controllers/UserController";
import SessionController from "./app/controllers/SessionController";
import authMiddlewares from "./app/middlewares/auth";
routes.post("/user", UseController.store);
//rota token de autenticação
routes.post("/sessions", SessionController.store);

//usando metodo global depos das rotas post, apenas as rotas depois do user(authMiddlewares) vão poder usar essa autenticação
routes.use(authMiddlewares);

//importando rota editar
routes.put("/userEdit", UseController.update);
module.exports = routes;
