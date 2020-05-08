import { Request } from "express";
import TokenService from "@/services/token";
import { Controller, RouteResponse, Post, Public, Test } from "@/utils";

@Controller("/token/test")
class TokenTestService {
  @Test
  @Public
  @Post("/generate")
  public generate(req: Request): RouteResponse {
    const { ip, role_level, username } = req.body;

    if (ip && role_level >= 0 && username)
      return RouteResponse.say("Success").send({
        token: TokenService.create({ ip, role_level, username }),
      });
    return RouteResponse.deny("Not all data is present");
  }
}

export default TokenTestService;
