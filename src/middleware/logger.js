import Logger from "@/services/logger";

export default () => {
  return (req, res, next) => {
    Logger.route(req);
    next();
  };
};
