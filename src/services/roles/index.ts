import student from "./roles/student";
import { IRole } from "@/@types";
import { LogOnErrorSync } from "@/utils";

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
const roles: IRole[] = [student];

class RolesService {
  @LogOnErrorSync
  static authorize(role_level: number, api: string): boolean {
    const role = roles[role_level];

    if (role) {
      for (const action of role.actions) {
        const regexp = action.replace(/\//g, "\\/").replace(/\*/g, "([0-9a-z:\\-]*)");

        const test = new RegExp(regexp, "i");

        if (test.test(api)) return true;
      }
    }

    return false;
  }
}

export default RolesService;
