import UserModels from "@/models/users";
import { Controller, Post, RouteResponse } from "@/utils";
import { Request } from "express";
import { Body } from "@/utils/Route";
import CryptoService from "@/services/crypto";
import TokenService from "@/services/token";
import IUser from "@/models/users/interface";

@Controller("/users")
class UsersController {
  public static async findAndCompare(
    username: string,
    password: string,
    type: "fast" | "slow"
  ): Promise<IUser | "password" | "user"> {
    const User = type == "fast" ? UserModels.fast : UserModels.slow;
    const user = await User.findOne({ username }).exec();

    if (user) {
      const hashPassword = CryptoService.hashPassword(password);
      const isValidPassword = CryptoService.validatePasswords(password, hashPassword);

      return isValidPassword ? user : "password";
    }

    return "user";
  }

  @Body({
    username: String,
    password: String,
  })
  @Post("/authorize")
  public async authorize(req: Request) {
    const { username, password } = req.body;

    const result = await UsersController.findAndCompare(username, password, "fast");
    console.log("RESULT", result);

    if (result === "user") return RouteResponse.deny("User not found", 404);
    if (result === "password") return RouteResponse.deny("Password is incorrect");

    const token = TokenService.create({
      ip: req.clientIp as string,
      roles: result.roles,
      username,
    });

    return RouteResponse.say("Success").send({
      token,
      user: {
        username,
        language: result.language,
        roles: result.roles,
        widgets: result.widgets,
        // TODO return user status here
        // status: result.status
      },
    });
  }

  @Body({
    username: String,
    password: String,
  })
  @Post("/validate")
  public async validate(req: Request) {
    const { username, password } = req.body;

    const result = await UsersController.findAndCompare(username, password, "fast");

    if (result === "user") return RouteResponse.deny("User not found", 404);
    if (result === "password") return RouteResponse.deny("Password is incorrect");

    return RouteResponse.say("Credentials are valid");
  }
}

export default UsersController;
