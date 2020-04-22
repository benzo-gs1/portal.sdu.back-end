import publicRole from "./roles/public";
import student from "./roles/student";

/**
 * Roles
 *
 * @description
 * Each role is defined by level and title. Role contains information of what modules to load on application and what routes it has access to.
 *
 * @tutorial actions - Place accessible routes to actions without "/api" prefix. e.g. api/some/route -> /some/route
 * @tutorial modules - Place structure of modules that needs to be loaded in client's app
 * @tutorial extends - list of roles from what to extend actions
 */
const roles = { public: publicRole, student };

export default roles;
