import jwt from "jsonwebtoken";
import config from "@/config";
import Logger from "@/services/logger";

class TokenService {
  /**
   * @description Creating user access token.
   *
   * @returns signed jwt token or false in case of error
   */
  static create(data, lifeTime = "1h") {
    try {
      return jwt.sign(data, config.secretKey, {
        expiresIn: lifeTime,
        algorithm: config.secretAlgorithm,
      });
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

  static bearerParser(headers) {
    const header = headers["authorization"];

    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];
      return token ?? false;
    }
    return false;
  }
}

export default TokenService;
