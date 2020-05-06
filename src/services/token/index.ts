import jwt from "jsonwebtoken";
import config from "@/config";
import { Request } from "express";
import { ITokenData } from "@/@types";
import { LogOnError } from "@/utils";

class TokenService {
  /**
   * @description Creating user access token.
   *
   * @returns signed jwt token or false in case of error
   */
  @LogOnError
  static create(data: ITokenData, lifeTime = "1h"): string | false {
    return jwt.sign(data, config.secretKey, {
      expiresIn: lifeTime,
      algorithm: config.secretAlgorithm as jwt.Algorithm,
    });
  }

  /**
   * @description validates given token
   *
   * @returns encapsulated data or false in case token is invalid
   */
  @LogOnError
  static validate(token: string): ITokenData | false {
    const data = jwt.verify(token, config.secretKey);
    return data as ITokenData;
  }

  @LogOnError
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
