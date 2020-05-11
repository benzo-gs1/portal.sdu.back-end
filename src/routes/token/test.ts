import { Request } from "express";
import TokenService from "@/services/token";
import { Controller, RouteResponse, Post, Public, Test } from "@/utils";
import { Body } from "@/utils/Route";

@Controller("/token/test")
class TokenTestService {
  @Test
  @Public
  @Body({
    ip: String,
    role_level: Number,
    username: String,
  })
  @Post("/generate")
  public generate(req: Request): RouteResponse {
    const { ip, role_level, username } = req.body;

    return RouteResponse.say("Success").send({
      token: TokenService.create({ ip, role_level, username }),
    });
  }
}

export default TokenTestService;
