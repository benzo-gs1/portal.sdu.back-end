import { Server } from "http";
import { Request } from "express";
import { Connection } from "mongoose";
import { EventNames } from "./EventNames";
import { ModelNames } from "./ModelNames";

export { EventNames, ModelNames };

export interface IConnection {
  slow: Connection;
  fast: Connection;
}

export interface IConfig {
  port: number;
  isProduction: boolean;
  secretAlgorithm: string;
  secretKey: string;
  mongodbUri: string;
  mongoConnection?: IConnection;
  server?: Server;
  isTesting?: boolean;
  [index: string]: any;
  setConfig: (key: string, value: any) => void;
  init: () => void;
}

export interface ITokenData {
  ip: string;
  username: string;
  role_level: number;
}

export interface IRequestWithToken extends Request {
  token?: ITokenData;
}

export interface IRole {
  level: number;
  title: string;
  actions: string[];
}
