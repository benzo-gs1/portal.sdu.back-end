import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Request, Response, Application } from "express";
import { RouteDefinition, RouteResponse } from "@/utils";

function runner(origin: string, controllers: any[] = [], root = origin) {
  const base = join(__dirname, "../", origin);
  const items = readdirSync(base);

  items.forEach((item) => {
    let pathToItem = join(origin, item);

    const status = statSync(join(base, item));

    if (status.isDirectory()) runner(pathToItem, controllers, root);
    else if (status.isFile()) {
      controllers.push(require(join(base, item)).default);
    }
  });

  return controllers;
}

export default function collector(app: Application) {
  const controllers = runner("routes");
  controllers.forEach((controller) => {
    const instance = new controller();
    const prefix = Reflect.getMetadata("prefix", controller);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", controller);

    routes.forEach((route) => {
      const path = join("/api", prefix, route.path);
      console.log(path);

      app[route.requestMethod](path, (req: Request, res: Response) => {
        const response = instance[route.methodName](req, res) as RouteResponse;
        const code = response.code;
        delete response["code"];
        res.status(code).send(response);
      });
    });
  });
}
