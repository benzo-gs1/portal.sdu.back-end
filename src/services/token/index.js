import jwt from "jsonwebtoken";
import { secret } from "@/config";

export default class TokenService {
  static create(data, lifeTime) {
    return jwt.sign(data, secret.user, { expiresIn: lifeTime, algorithm: secret.algorithm });
  }

  static validate(token) {
    try {
      const result = jwt.verify(token, secret);
      return result;
    } catch (err) {
      return false;
    }
  }

  static middle(req, res, next) {
    const header = req.headers["authorization"];

    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];

      req.token = token;
      next();
    }
    res.sendStatus(403);
  }
}
