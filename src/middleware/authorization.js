import TokenService from "@/services/token";
import RolesService from "@/services/roles";

export default (req, res, next) => {
  const parsed = TokenService.bearerParser(req.headers);

  // has token
  if (parsed) {
    const token = TokenService.validate(parsed);

    // token is valid
    if (token) {
      const { ip, role_level } = token;
      const clientIp = req.clientIp;

      // same ip source
      if (ip === clientIp) {
        const isAuthorized = RolesService.authorize(role_level, req.originalUrl);

        // resource is available for the role
        if (isAuthorized) {
          req.token = token;
          return next();
        }
      }
    }

    // token is invalid || ip is invalid || resource is unavailable
    return res.sendStatus(403);
  }

  // no token
  return res.sendStatus(401);
};
