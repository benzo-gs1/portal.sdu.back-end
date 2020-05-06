import { Controller, Public, Protected, Post, RouteResponse } from "@/utils";

@Controller("/token")
class TokenActionsController {
  @Public
  @Protected
  @Post("/validate")
  public validate(): RouteResponse {
    return RouteResponse.say("Token Validated");
  }
}

export default TokenActionsController;
