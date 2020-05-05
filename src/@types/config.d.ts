import { Server } from "http";

declare interface IConfig {
  port: number;
  isProduction: boolean;
  secretAlgorithm: string;
  secretKey: string;
  mongodbUri: string;
  ignoredRoutes: string[];
  server?: Server;
  isTesting?: boolean;
  [index: string]: any;
  setConfig: (key: string, value: any) => void;
  init: () => void;
}
