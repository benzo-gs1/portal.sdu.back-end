import jwt from "jsonwebtoken";
import config from "@/config";
import Logger from "@/services/logger";

class TokenService {
  /**
   * @description Creating user access token. Ip address, role level and username must be passed as data
   *
   * @returns signed jwt token or false in case of error
   */
  static create(data, lifeTime = "1h") {
    try {
      if (data.ip && data.role_level && data.username) {
        return jwt.sign(data, config.secretKey, {
          expiresIn: lifeTime,
          algorithm: config.secretAlgorithm,
        });
      }
    } catch (err) {
      Logger.error("Token Service", err);
      return false;
    }
  }

  /**
   * @description validates given token
   *
   * @returns encapsulated data or false in case token is invalid
   */
  static validate(token) {
    try {
      return jwt.verify(token, config.secretKey);
    } catch (err) {
      Logger.error("Token Service", err);
      return false;
    }
  }

  /**
   * @description middleware function for token validation
   *
   * @returns sets req.token property with token's payload or sends 403 HTTP status code
   */
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
