import UserModels from "@/models/users";
import { Controller, Test, Post, RouteResponse } from "@/utils";
import { Request } from "express";
import { Body } from "@/utils/Route";
import CryptoService from "@/services/crypto";
import TokenService from "@/services/token";

@Controller("/users")
class UsersTestController {
  @Body({
    username: String,
    password: String,
  })
  @Post("/authorize")
  public authorize(req: Request) {
    const { username, password } = req.body;
    const User = UserModels.fast;

    const userFound = User.findOne({ username: username });

    if (userFound) {
      const hashPassword = CryptoService.hashPassword(password);
      const isValid = CryptoService.validatePasswords(password, hashPassword);

      if (isValid) {
        const data = {
          role_level: 0,
          username: username,
          ip: "idunno",
        };
        const token = TokenService.create(data);

        return RouteResponse.say("Success").send({
          status: true,
          message: "Success",
          data: {
            token: token,
            user: userFound,
          },
        });
      } else {
        return RouteResponse.deny("Password is incorrect").send({
          status: false,
          message: "Password is incorrect",
        });
      }
    } else {
      return RouteResponse.deny("User not found").send({
        status: true,
        message: "User not found",
      });
    }
  }
}

export default UsersTestController;
