import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Request, Response, Application, NextFunction } from "express";
import { RouteDefinition, RouteResponse, Post } from "@/utils";
import { logger, publicApi, privateApi, authorization } from "@/middleware";
import { IConfig } from "@/@types";
import Logger from "@/services/logger";

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

export default function collector(app: Application, config: IConfig) {
  const controllers = runner("routes");
  app.use("/api", logger());

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
      const body = Reflect.hasMetadata("body", handler)
        ? Reflect.getMetadata("body", handler)
        : false;

      const path = join("/api", prefix, route.path);

      // test routes are skipped in production
      if (config.isProduction && isTest) return;

      const access = accessName === "private" ? privateApi : publicApi;

      const responseBody = (req: Request, res: Response) => {
        try {
          const response = handler(req, res) as RouteResponse;
          const code = response.code;
          delete response["code"];
          res.status(code).send(response);
        } catch (err) {
          Logger.error(`Route: ${path}`, err);
          res.status(500).send({
            status: false,
            message:
              "Internal server error, please contact developers for quick problem resolving",
          });
        }
      };

      // TODO could possibly be simplified
      const bodyHandler = (req: Request, res: Response, next: NextFunction) => {
        // running through each key
        for (const key in body) {
          // when requested key is not in the request body and datatype is not valid
          const isPresent = key in req.body;

          if (!isPresent) {
            return res.status(412).send({
              status: false,
              message: `Request lacks body parameter: ${key}`,
            });
          }
          const reqType = typeof req.body[key];
          const bodyType = body[key].name?.toLowerCase();
          const isCorrectType = reqType === bodyType;

          if (!isCorrectType) {
            return res.status(412).send({
              status: false,
              message: `Body parameter bad datatype: ${reqType} found, but ${bodyType} expected`,
            });
          }
        }

        return next();
      };

      if (isProtected && body)
        app[route.requestMethod](path, access(), authorization(), bodyHandler, responseBody); 
      else if (isProtected && !body) 
        app[route.requestMethod](path, access(), authorization(), responseBody);
      else if (!isProtected && body)
        app[route.requestMethod](path, access(), bodyHandler, responseBody);
      else if (!isProtected && !body)
        app[route.requestMethod](path, access(), responseBody);
    });
  });
}
