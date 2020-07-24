import  express  from "express";
import routes from "./routes";
import './database/index'
class App {
  constructor() {
    this.server = express();
    //chamandos os metodos
    this.middlewares();
    this.routes();
  }
  //preparando API para receber tipo Json
  middlewares() {
    this.server.use(express.json());
  }

  //configurando as rotas da API
  routes() {
    this.server.use(routes);
  }
}

export default new App().server