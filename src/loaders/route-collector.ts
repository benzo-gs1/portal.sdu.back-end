import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Request, Response, Application } from "express";
import { RouteDefinition, RouteResponse } from "@/utils";
import { logger, publicApi, privateApi, authorization } from "@/middleware";
import config from "@/config";

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
  if (!config.isTesting) app.use("/api", logger());

  controllers.forEach((controller) => {
    const instance = new controller();
    const prefix = Reflect.getMetadata("prefix", controller);
    const routes: RouteDefinition[] = Reflect.getMetadata("routes", controller);

    routes.forEach((route) => {
      const handler = instance[route.methodName];

      // middleware metadata
      const isTest = Reflect.hasMetadata("test", handler)
        ? Reflect.getMetadata("test", handler)
        : false;
      const accessName = Reflect.hasMetadata("public_or_private", handler)
        ? Reflect.getMetadata("public_or_private", handler)
        : "public";
      const isProtected = Reflect.hasMetadata("protected", handler)
        ? Reflect.getMetadata("protected", handler)
        : false;

      console.log(route.methodName, isTest);

      const path = join("/api", prefix, route.path);

      // test routes are skipped in production
      if (config.isProduction && isTest) return;

      const access = accessName === "private" ? privateApi : publicApi;

      const responseBody = (req: Request, res: Response) => {
        const response = handler(req, res) as RouteResponse;
        const code = response.code;
        delete response["code"];
        res.status(code).send(response);
      };

      if (isProtected)
        app[route.requestMethod](path, access(), authorization(), responseBody);
      else app[route.requestMethod](path, access(), responseBody);
    });
  });
}
