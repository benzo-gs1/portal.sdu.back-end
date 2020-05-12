import UserModels from "@/models/users";
import { Controller, Test, Post, RouteResponse } from "@/utils";
import { Request } from "express";
import { Body, Delete } from "@/utils/Route";
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
  public async create(req: Request) {
    const { username, password, language, role } = req.body;

    const User = UserModels.fast;
    const hashedPassword = CryptoService.hashPassword(password);

    const user = new User({
      username,
      password: hashedPassword,
      language,
      roles: [role],
    });

    await user.save();
    return RouteResponse.say("Success").send(user);
  }

  @Test
  @Body({
    username: String,
  })
  @Delete("/delete")
  public async delete(req: Request) {
    const { username } = req.body;

    const User = UserModels.fast;

    await User.findOneAndRemove({ username }).exec();
    return RouteResponse.say("Success");
  }
}

export default UsersTestController;
