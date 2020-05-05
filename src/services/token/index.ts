import jwt from "jsonwebtoken";
import config from "@/config";
import Logger from "@/services/logger";
import { Request } from "express";
import { ITokenData } from "@/@types";

class TokenService {
  /**
   * @description Creating user access token.
   *
   * @returns signed jwt token or false in case of error
   */
  static create(data: ITokenData, lifeTime = "1h"): string | false {
    try {
      return jwt.sign(data, config.secretKey, {
        expiresIn: lifeTime,
        algorithm: config.secretAlgorithm as jwt.Algorithm,
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
  static validate(token: string): ITokenData | false {
    try {
      const data = jwt.verify(token, config.secretKey);
      return data as ITokenData;
    } catch (err) {
      Logger.error("Token Service", err);
      return false;
    }
  }

  static bearerParser(req: Request): string | false {
    const header = req.headers.authorization;

    if (header) {
      const bearer = header.split(" ");
      const token = bearer[1];
      return token ?? false;
    }
    return false;
  }
}

export default TokenService;
