import jwt from "jsonwebtoken";
import config from "@/config";

class TokenService {
  static create(data, lifeTime = "1h") {
    if (data.ip && data.role_level && data.username) {
      return jwt.sign(data, config.secretKey, {
        expiresIn: lifeTime,
        algorithm: config.secretAlgorithm,
      });
    }
    return false;
  }

  static validate(token) {
    try {
      return jwt.verify(token, config.secretKey);
    } catch (err) {
      return false;
    }
  }

  static middle(req, res, next) {
    const header = req.headers["authorization"];

    if (header) {
      const parsed = this.bearerParser(header);
      const token = this.validate(parsed);

      if (token) {
        req.token = token;
        next();
      }
    }

    return res.sendStatus(403);
  }

  static bearerParser(header) {
    const bearer = header.split(" ");
    const token = bearer[1];

    return token ?? "";
  }
}

export default TokenService;
