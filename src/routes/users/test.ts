import UserModels from "@/models/users";
import { Controller, Test, Post, RouteResponse } from "@/utils";
import { Request } from "express";
import { Body } from "@/utils/Route";
import CryptoService from "@/services/crypto";

@Controller("/users/test")
class UsersTestController {
  @Test
  @Body({
    username: String,
    password: String,
    language: String,
    role: Number,
  })
  @Post("/create")
  public create(req: Request) {
    const { username, password, language, role } = req.body;

    const User = UserModels.fast;
    const hashedPassword = CryptoService.hashPassword(password);

    const user = new User({
      username,
      password: hashedPassword,
      language,
      roles: [role],
    });

    user.save();
    return RouteResponse.say("Success").send(user);
  }
}

export default UsersTestController;
