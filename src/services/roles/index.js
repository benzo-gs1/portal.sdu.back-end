import roles from "./roles";

/**
 * Levels of security: token, ip, role_level, username
 *
 * First, verify token
 * Next, verify request was sent from the same id as encapsulated in token
 * Next, verify that route is accessible for the given role
 * Next, verify that the resource is owned by user using his username
 *
 * RolesService will give IP address and role level verification
 */
class RolesService {
  /**
   * @description middleware function for verifying client's ip address
   *
   */
  static middleIp(req, res, next) {
    const token = req.token;
    const ip = req.clientIp;

    if (token === ip) return next();
    return res.sendStatus(401);
  }

  static middleRole(req, res, next) {
    const { role_level } = req.token;
  }

  static containsAction(routePath, role_level) {
    const role = roles[role_level];
    let allow = false;

    // check role's actions for routePath
  }
}

export default RolesService;
