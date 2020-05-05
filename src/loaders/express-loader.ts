import * as express from "express";
import { json } from "body-parser";
import * as cookieParser from "cookie-parser";
import * as helmet from "helmet";
import * as requestIp from "request-ip";

export default async () => {
  const app = express();

  app.use(helmet());
  app.use(cookieParser());
  app.use(json());
  app.use(requestIp.mw());

  return app;
};
