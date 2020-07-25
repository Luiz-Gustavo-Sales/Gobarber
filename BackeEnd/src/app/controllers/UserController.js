//importando o models do usuário para poder criar novos usuários
import User from "../models/User";
import { json } from "sequelize";

//Controller criar usuário

class userController {
  async store(req, res) {
    //verificando se não já existe um usuário no banco de dados
    const userExist = await User.findOne({ where: { email: req.body.email } });
    if (userExist) {
      return res.status(400).json({ error: "User already exists" });
    }
    const { id, name, email, provider } = await User.create(req.body);

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }

  async update(req, res) {
    console.log(req.userId);
    return res.json({ ok: "tudo certo" });
  }
}
export default new userController();
