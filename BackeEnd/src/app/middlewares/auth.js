import jwt from "jsonwebtoken";
//biblioteca pega uma função de callback que podemos usar Async Await
import { promisify } from "util";
import authConfig from "../../config/auth";
export default async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ erro: "Token not provided" });
  }
  //usando função split para  quebrar o token em um array onde el vai retorna Bearer mmais o Token
  //usando desestruturação pegando apenas o token
  const [, token] = authHeader.split(" ");
  try {
    //promisify vai retona outra funcao(onde passa o token)
    //decoded fica as informações onde passamos pelo token o ID mais o tempo de experiração
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    console.log(decoded);
    req.userId = decoded.id;
  } catch (error) {
    return res.status(401).json({ erro: "Token invalid" });
  }
  //retornando next para poder prosseguir para rota edição do usuário
  return next();
};
