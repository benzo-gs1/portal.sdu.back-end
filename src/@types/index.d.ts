import { Server } from "http";
import { Request } from "express";
import { Connection } from "mongoose";

export const enum EventNames {
  SERVER_CLOSE = "server::close",
  SERVER_SETUP = "server::setup",
  MONGO_CONNECTED = "mongo::connected",
}

export const enum ModelNames {
  COURSES = "courses",
  CURRICULUMS = "curriculum",
  DEPARTMENTS = "departments",
  FACULTIES = "faculties",
  USERS = "users",
}

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
  ignoredRoutes: string[];
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
  modules: Object;
}
