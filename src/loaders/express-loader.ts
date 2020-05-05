import express from "express";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import requestIp from "request-ip";

export default () => {
  const app = express();

  app.use(helmet());
  app.use(cookieParser());
  app.use(json());
  app.use(requestIp.mw());

  return app;
};
