import config from "@/config";
import expressLoader from "@/loaders/express-loader";
import routeCollector from "@/loaders/route-collector";
import { Application } from "express";
import { Server } from "http";
import "reflect-metadata";
import axios, { AxiosResponse } from "axios";
import { join } from "path";
import { IConfig } from "@/@types";
import { expect } from "chai";

interface DumpServerConfigs {
  isTesting?: boolean;
  isProduction?: boolean;
  withoutRoutes?: boolean;
  port?: number;
}

class DumpServer {
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
    config.init();
    this.config = Object.assign({}, config);
    this.config.isTesting = options.isTesting ?? true;
    this.config.isProduction = options.isProduction ?? false;
    this.config.port = options.port ?? 3000;

    // creating express app
    this.app = expressLoader();

    // collecting routes
    if (!options.withoutRoutes) routeCollector(this.app, this.config);

    this.server = null;
  }

  public get listening() {
    return this.server?.listening ?? false;
  }

  public get instance() {
    return this.server;
  }

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

  public post(point: string, data = {}, token = ""): Promise<AxiosResponse<any>> {
    return axios.post(
      `http://localhost:${this.config.port}${join("/api", point)}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  }

  public postForError(
    point: string,
    done: Function,
    tests: Function,
    data = {},
    token = ""
  ) {
    this.post(point, data, token)
      .then(() => done("Error"))
      .catch((err) => {
        tests(err.response);
        done();
      });
  }

  public postForProtected(point: string, done: Function) {
    // no token
    this.post(point)
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
}

export default DumpServer;
