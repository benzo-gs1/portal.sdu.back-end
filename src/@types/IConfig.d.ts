import { Server } from "http";
import { IConnection } from "./IConnection";

declare interface IConfig {
  port: number;
  isProduction: boolean;
  secretAlgorithm: string;
  secretKey: string;
  mongodbUri: string;
  mongoConnection?: IConnection;
  ignoredRoutes: string[];
  server?: Server;
  isTesting?: boolean;
  [index: string]: any;
  setConfig: (key: string, value: any) => void;
  init: () => void;
}
