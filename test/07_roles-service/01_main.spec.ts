import RoleService from "@/services/role";
import testRole from "@/services/role/roles/test";
import { expect } from "chai";

const TEST_ROLE_INDEX = 0;

const EXACT_ROUTE = "/tests/exact/fetch";
const ANY_ROUTE = "/tests/any/*";
const BETWEEN_ROUTE = "/tests/between/*/fetch";
const RANDOM_ROUTE = "some-not-existing-route";
const slow = {
  authorize: 20,
};

describe("Roles Service", function () {
  describe("#authorize()", function () {
    this.slow(slow.authorize);

    it("must not pass when role has no actions", () => {
      const isPassing = RoleService.authorize(TEST_ROLE_INDEX, RANDOM_ROUTE);
      expect(isPassing).to.be.false;
    });

    // pushing new routes
    testRole.actions.push(EXACT_ROUTE, ANY_ROUTE, BETWEEN_ROUTE);

    it("must not pass when route is not in the list", () => {
      const isPassing = RoleService.authorize(TEST_ROLE_INDEX, RANDOM_ROUTE);
      expect(isPassing).to.be.false;
    });

    it("should allow at exact route", () => {
      const isPassing = RoleService.authorize(TEST_ROLE_INDEX, EXACT_ROUTE);
      expect(isPassing).to.be.true;
    });

    it("should allow at any route", () => {
      const isPassing1 = RoleService.authorize(
        TEST_ROLE_INDEX,
        ANY_ROUTE.replace("*", "fetch-1")
      );
      const isPassing2 = RoleService.authorize(
        TEST_ROLE_INDEX,
        ANY_ROUTE.replace("*", "fetch-2")
      );
      expect(isPassing1 && isPassing2).to.be.true;
    });

    it("should allow at between route", () => {
      const isPassing1 = RoleService.authorize(
        TEST_ROLE_INDEX,
        BETWEEN_ROUTE.replace("*", "between-1")
      );
      const isPassing2 = RoleService.authorize(
        TEST_ROLE_INDEX,
        BETWEEN_ROUTE.replace("*", "between-2")
      );

      expect(isPassing1 && isPassing2).to.be.true;
    });
  });
});
