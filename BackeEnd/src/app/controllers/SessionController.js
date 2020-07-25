import User from "../models/User";

//importando configuração do TOKEN
import autConfig from "../../config/auth";

//biblioteca TOKEN
import jwt from "jsonwebtoken";


class SessionController {
  async store(req, res) {
    //pegando os dados no body
    const { email, password } = req.body;
    //procurando o user pelo e-mail(email é unico)
    const user = await User.findOne({ where: { email } });
    
    ///verificando se o usuário existe no banco de dados
    if (!user) {
      return res.status(401).json({ erro: "user not Foud" });
    }
    //verificando se a senha está errada
    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ erro: "user does not match" });
    }
    //pegando o ID e NAME do usuário para o Token
    const { id, name } = user;

    return res.json({
      //retornando os dados do usuário
      /*retornando o token usando o metodo sign(
          primeiro parametro:PLOAD 
          - Segundo parametro:String que só você tem acesso - 
          Terceiro parametro:data de expiração do Toekn
          )
      */
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, autConfig.secret, {
        expiresIn: autConfig.expiresIn,
      }),
    });
  }
}
export default new SessionController();
