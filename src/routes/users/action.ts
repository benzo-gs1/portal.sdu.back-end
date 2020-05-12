import UserModels from "@/models/users";
import { Controller, Post, RouteResponse } from "@/utils";
import { Request } from "express";
import { Body } from "@/utils/Route";
import CryptoService from "@/services/crypto";
import TokenService from "@/services/token";

@Controller("/users")
class UsersController {
  @Body({
    username: String,
    password: String,
  })
  @Post("/authorize")
  public async authorize(req: Request) {
    const { username, password } = req.body;
    const User = UserModels.fast;

    const userFound = await User.findOne({ username }).exec();

    if (userFound) {
      const hashPassword = CryptoService.hashPassword(password);
      const isValidPassword = CryptoService.validatePasswords(password, hashPassword);

      if (isValidPassword) {
        const token = TokenService.create({
          ip: req.clientIp as string,
          roles: userFound.roles,
          username,
        });

        return RouteResponse.say("Success").send({
          token: token,
          user: userFound,
        });
      }

      return RouteResponse.deny("Password is incorrect");
    }

    return RouteResponse.deny("User not found", 404);
  }

  @Body({
    username: String,
    password: String,
  })
  @Post("/validate")
  public validate(req: Request) {
    const { username, password } = req.body;
    const User = UserModels.fast;

    const userFound = User.findOne({ username: username });

    if (userFound) {
      const token = req.headers.authorization;

      if (token) {
        const isValidToken = TokenService.validate(token);

        return isValidToken
          ? RouteResponse.say("Credentials are valid").send({
              status: true,
              message: "Credentials are valid",
            })
          : RouteResponse.deny("Password is incorrect").send({
              status: false,
              message: "Password is incorrect",
            });
      } else {
        return RouteResponse.say("No token found");
      }
    } else {
      return RouteResponse.deny("User not found").send({
        status: true,
        message: "User not found",
      });
    }
  }
}

export default UsersController;
