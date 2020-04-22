import roles from "./roles";

/**
 * Levels of security: token, ip, role_level, username
 *
 * First, verify token
 * Next, verify request was sent from the same id as encapsulated in token
 * Next, verify that route is accessible for the given role
 * Next, verify that the resource is owned by user using his username
 *
 */
class RolesService {}

export default RolesService;
