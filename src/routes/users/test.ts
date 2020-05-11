import UserModels from "@/models/users";
import { Controller, Test, Post, RouteResponse } from "@/utils";
import { Request } from "express";

@Controller("/users/test")
class UsersTestController {
  @Test
  @Post("/create")
  public create(req: Request) {
    const { username, password, language, role } = req.body;

    if (username && password && role >= 0) {
      const User = UserModels.fast;

      const user = new User({
        username,
        password,
        language,
        roles: [role],
      });

      user.save();
      return RouteResponse.say("Success").send(user);
    }
    return RouteResponse.deny("Request condition not met", 412);
  }
}

export default UsersTestController;
