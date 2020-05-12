import { Request } from "express";
import TokenService from "@/services/token";
import { Controller, RouteResponse, Post, Public, Test } from "@/utils";
import { Body } from "@/utils/Route";

@Controller("/token/test")
class TokenTestService {
  @Test
  @Public
  @Body({
    roles: Array,
    username: String,
  })
  @Post("/generate")
  public generate(req: Request): RouteResponse {
    const { ip, roles, username } = req.body;

    return RouteResponse.say("Success").send({
      token: TokenService.create({ ip: ip ?? req.clientIp, roles, username }),
    });
  }
}

export default TokenTestService;
