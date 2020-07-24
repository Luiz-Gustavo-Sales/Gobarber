//conexão com banco de DADOS

import Sequelize from "sequelize";

//importando models=(tabela) do usuário
import User from "../app/models/User";
//crinado array com todos User do banco de daod
const models = [User];
//conexão com banco de dados
import databaseConfig from "../config/database";
class DataBase {
  constructor() {
    this.init();
  }
  init() {
  //conexão database 
  //connection é a variavel do model do metodo init(sequelize)
    this.connection = new Sequelize(databaseConfig);


    models.map(model =>model.init(this.connection))
  }
}

export default new DataBase();
