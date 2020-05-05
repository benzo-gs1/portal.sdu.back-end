import Logger from "@/services/logger";
import { Request, Response, NextFunction } from "express";

export default () => {
  return (req: Request, res: Response, next: NextFunction) => {
    Logger.route(req);
    next();
  };
};
