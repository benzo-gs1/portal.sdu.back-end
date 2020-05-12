import config from "@/config";
import expressLoader from "@/loaders/express-loader";
import routeCollector from "@/loaders/route-collector";
import { init as dbInit } from "@/loaders/db-loader";
import { Application } from "express";
import { Server } from "http";
import "reflect-metadata";
import axios, { AxiosResponse } from "axios";
import { join } from "path";
import { IConfig } from "@/@types";
import { expect } from "chai";

interface DumpServerConfigs {
  isProduction?: boolean;
  withoutRoutes?: boolean;
  port?: number;
}

type ResponseType = "error" | "good";
type RequestType = "get" | "post" | "put" | "delete";

class DumpServer {
  [index: string]: any;
  public static servers = new Map<string, DumpServer>();
  public static register(name: string, server: DumpServer) {
    this.servers.set(name, server);
  }
  public static unregister(name: string) {
    this.servers.delete(name);
  }
  public static get(name: string): DumpServer {
    return this.servers.get(name) as DumpServer;
  }

  public app: Application;
  public server: Server | null;
  public config: IConfig;

  constructor(options: DumpServerConfigs = {}) {
    // initializing configs
    this.config = Object.assign({}, config);
    this.config.isProduction = options.isProduction ?? false;
    this.config.port = options.port ?? 3000;

    // creating express app
    this.app = expressLoader();

    // collecting routes
    if (!options.withoutRoutes) routeCollector(this.app, this.config);

    this.server = null;
  }

  // switching test modes
  public static enableTestMode() {
    config.isTesting = true;
  }
  public static disableTestMode() {
    config.isTesting = false;
  }

  // establishing mongo connection
  public static async startConnection() {
    config.mongoConnection = await dbInit();
  }
  public static stopConnection() {
    config.mongoConnection?.fast.close();
    config.mongoConnection?.slow.close();
  }

  // getters
  public get listening() {
    return this.server?.listening ?? false;
  }
  public get instance() {
    return this.server;
  }

  // start/stop server
  public start(): void {
    if (this.server) throw new Error("Cannot start server, it's already started");
    this.restart();
  }
  public restart(): void {
    if (this.server) this.server.close();
    this.server = this.app.listen(this.config.port);
    this.config.server = this.server;
  }
  public stop(): void {
    if (!this.server) throw new Error("Cannot stop server, it's not active now");
    this.server.close();
  }

  // request templates
  public request(
    type: RequestType,
    point: string,
    data = {},
    token = ""
  ): Promise<AxiosResponse<any>> {
    let method: Function;
    const url = `http://localhost:${this.config.port}${join("/api", point)}`;
    const options: any = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    switch (type) {
      case "get":
        return axios.get(url, options);
      case "post":
        method = axios.post;
        break;
      case "put":
        method = axios.put;
        break;
      case "delete":
        options.data = data;
        return axios.delete(url, options);
    }
    return method(url, data, options);
  }
  public requestForError(
    type: RequestType,
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.request(type, point, data, token)
      .then(() => done("Error"))
      .catch((err) => {
        tests(err.response);
        done();
      });
  }
  public requestForGood(
    type: RequestType,
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.request("post", point, data, token)
      .then((res) => {
        tests(res);
        done();
      })
      .catch(() => done("Error"));
  }
  public requestForCode(
    type: RequestType,
    point: string,
    done: Function,
    code: number,
    status: ResponseType,
    data = {},
    token = ""
  ) {
    let method: string = "";
    if (status === "good") method = `${type}ForGood`;
    else if (status === "error") method = `${type}ForError`;

    if (method in this) {
      this[method](
        point,
        done,
        (res: AxiosResponse) => {
          expect(res.status).to.be.equal(code);
        },
        data,
        token
      );
    }
  }
  public requestForProtected(type: RequestType, point: string, done: Function) {
    // no token
    this.request(type, point)
      .then(() => done("Error"))
      .catch((err) => {
        expect(err.response.status).to.be.equal(401);

        // bad token
        return this.post(point, {}, "some.false.token");
      })
      .then(() => done("Error"))
      .catch((err) => {
        expect(err.response.status).to.be.equal(403);
        done();
      });
  }
  public requestForNotFound(
    type: RequestType,
    point: string,
    done: Function,
    data = {},
    token = ""
  ) {
    this.requestForCode(type, point, done, 404, "error", data, token);
  }
  public requestForDeny(
    type: RequestType,
    point: string,
    done: Function,
    data = {},
    token = ""
  ) {
    this.requestForCode(type, point, done, 400, "error", data, token);
  }
  public requestForOk(
    type: RequestType,
    point: string,
    done: Function,
    data = {},
    token = ""
  ) {
    this.requestForCode(type, point, done, 200, "good", data, token);
  }
  public requestForBadBody(
    type: RequestType,
    point: string,
    done: Function,
    data = {},
    token = ""
  ) {
    this.requestForCode(type, point, done, 412, "error", data, token);
  }

  // get requests
  public get(point: string, token = ""): Promise<AxiosResponse<any>> {
    return this.request("get", point, {}, token);
  }
  public getForError(point: string, done: Function, tests: Function, token = "") {
    this.requestForError("get", point, done, tests, {}, token);
  }
  public getForGood(point: string, done: Function, tests: Function, token = "") {
    this.requestForGood("get", point, done, tests, {}, token);
  }
  public getForCode(
    point: string,
    done: Function,
    code: number,
    status: ResponseType,
    token = ""
  ) {
    this.requestForCode("get", point, done, code, status, {}, token);
  }
  public getForProtected(point: string, done: Function) {
    this.requestForProtected("get", point, done);
  }
  public getForNotFound(point: string, done: Function, token = "") {
    this.requestForNotFound("get", point, done, {}, token);
  }
  public getForDeny(point: string, done: Function, token = "") {
    this.requestForDeny("get", point, done, {}, token);
  }
  public getForOk(point: string, done: Function, token = "") {
    this.requestForOk("get", point, done, {}, token);
  }
  public getForBadBody(point: string, done: Function, token = "") {
    this.requestForBadBody("get", point, done, {}, token);
  }

  // post requests
  public post(point: string, data = {}, token = ""): Promise<AxiosResponse<any>> {
    return this.request("post", point, data, token);
  }
  public postForError(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForError("post", point, done, tests, data, token);
  }
  public postForGood(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForGood("post", point, done, tests, data, token);
  }
  public postForCode(
    point: string,
    done: Function,
    code: number,
    status: ResponseType,
    data = {},
    token = ""
  ) {
    this.requestForCode("post", point, done, code, status, data, token);
  }
  public postForProtected(point: string, done: Function) {
    this.requestForProtected("post", point, done);
  }
  public postForNotFound(point: string, done: Function, data = {}, token = "") {
    this.requestForNotFound("post", point, done, data, token);
  }
  public postForDeny(point: string, done: Function, data = {}, token = "") {
    this.requestForDeny("post", point, done, data, token);
  }
  public postForOk(point: string, done: Function, data = {}, token = "") {
    this.requestForOk("post", point, done, data, token);
  }
  public postForBadBody(point: string, done: Function, data = {}, token = "") {
    this.requestForBadBody("post", point, done, data, token);
  }

  // put requests
  public put(point: string, data = {}, token = ""): Promise<AxiosResponse<any>> {
    return this.request("put", point, data, token);
  }
  public putForError(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForError("put", point, done, tests, data, token);
  }
  public putForGood(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForGood("put", point, done, tests, data, token);
  }
  public putForCode(
    point: string,
    done: Function,
    code: number,
    status: ResponseType,
    data = {},
    token = ""
  ) {
    this.requestForCode("put", point, done, code, status, data, token);
  }
  public putForProtected(point: string, done: Function) {
    this.requestForProtected("put", point, done);
  }
  public putForNotFound(point: string, done: Function, data = {}, token = "") {
    this.requestForNotFound("put", point, done, data, token);
  }
  public putForDeny(point: string, done: Function, data = {}, token = "") {
    this.requestForDeny("put", point, done, data, token);
  }
  public putForOk(point: string, done: Function, data = {}, token = "") {
    this.requestForOk("put", point, done, data, token);
  }
  public putForBadBody(point: string, done: Function, data = {}, token = "") {
    this.requestForBadBody("put", point, done, data, token);
  }

  // delete requests
  public delete(point: string, data = {}, token = ""): Promise<AxiosResponse<any>> {
    return this.request("delete", point, data, token);
  }
  public deleteForError(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForError("delete", point, done, tests, data, token);
  }
  public deleteForGood(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.requestForGood("delete", point, done, tests, data, token);
  }
  public deleteForCode(
    point: string,
    done: Function,
    code: number,
    status: ResponseType,
    data = {},
    token = ""
  ) {
    this.requestForCode("delete", point, done, code, status, data, token);
  }
  public deleteForProtected(point: string, done: Function) {
    this.requestForProtected("delete", point, done);
  }
  public deleteForNotFound(point: string, done: Function, data = {}, token = "") {
    this.requestForNotFound("delete", point, done, data, token);
  }
  public deleteForDeny(point: string, done: Function, data = {}, token = "") {
    this.requestForDeny("delete", point, done, data, token);
  }
  public deleteForOk(point: string, done: Function, data = {}, token = "") {
    this.requestForOk("delete", point, done, data, token);
  }
  public deleteForBadBody(point: string, done: Function, data = {}, token = "") {
    this.requestForBadBody("delete", point, done, data, token);
  }
}

export default DumpServer;
