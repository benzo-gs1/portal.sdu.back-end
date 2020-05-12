import TokenService from "@/services/token";
import RoleService from "@/services/role";
import { Response, NextFunction } from "express";
import { IRequestWithToken } from "@/@types";

export default () => {
  return (req: IRequestWithToken, res: Response, next: NextFunction) => {
    const parsed = TokenService.bearerParser(req.headers.authorization);

    // has token
    if (parsed) {
      const token = TokenService.validate(parsed);

      // token is valid
      if (token) {
        const { ip, roles } = token;
        const clientIp = req.clientIp;

        // same ip source
        if (ip === clientIp) {
          let isAuthorized = roles.reduce((prev, curr) => {
            return prev && RoleService.authorize(curr, req.originalUrl);
          }, false);

          // resource is available for the role
          if (isAuthorized) {
            req.token = token;
            return next();
          }
        }
      }

      // token is invalid || ip is invalid || resource is unavailable
      return res.status(403).send({
        status: false,
        message: "Unauthorized",
      });
    }

    // no token
    return res.status(401).send({
      status: false,
      message: "No Token presented",
    });
  };
};
