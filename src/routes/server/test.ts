import pipe from "@/pipe";
import { EventNames } from "@/@types";
import { Controller, Put, RouteResponse, Public, Test } from "@/utils";

@Controller("/server/test")
class ServerTestController {
  @Test
  @Public
  @Put("/kill")
  public kill() {
    pipe.emit(EventNames.SERVER_CLOSE);
    return RouteResponse.say("Server is closed");
  }
}

export default ServerTestController;
