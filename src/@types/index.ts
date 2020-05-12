import { Server } from "http";
import { Request } from "express";
import { Connection, Model, Document } from "mongoose";
import { EventNames } from "./EventNames";
import { ModelNames } from "./ModelNames";
import { Languages } from "./Languages";

export { EventNames, ModelNames, Languages };

export interface IConnection {
  slow: Connection;
  fast: Connection;
}

export interface IModel<T extends Document> {
  slow: Model<T>;
  fast: Model<T>;
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
  roles: number[];
}

export interface IRequestWithToken extends Request {
  token?: ITokenData;
}

export interface IRole {
  level: number;
  title: string;
  actions: string[];
}
