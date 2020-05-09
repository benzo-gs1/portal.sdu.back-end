import config from "@/config";
import expressLoader from "@/loaders/express-loader";
import routeCollector from "@/loaders/route-collector";
import { Application } from "express";
import { Server } from "http";
import "reflect-metadata";
import axios, { AxiosResponse } from "axios";
import { join } from "path";

interface DumpServerConfigs {
  isTesting?: boolean;
  isProduction?: boolean;
}

class DumpServer {
  public app: Application;
  public server: Server | null;

  constructor(options: DumpServerConfigs = {}) {
    // initializing configs
    config.init();
    config.isTesting = options.isTesting ?? true;
    config.isProduction = options.isProduction ?? false;

    // creating express app
    this.app = expressLoader();

    // collecting routes
    routeCollector(this.app);

    this.server = null;
  }

  public start(): void {
    if (this.server) throw new Error("Cannot start server, it's already started");
    this.restart();
  }

  public restart(): void {
    if (this.server) this.server.close();
    this.server = this.app.listen(config.port);
  }

  public stop(): void {
    if (!this.server) throw new Error("Cannot stop server, it's not active now");
    this.server.close();
  }

  public post(point: string, data = {}, token = ""): Promise<AxiosResponse<any>> {
    return axios.post(`http://localhost:${config.port}${join("/api", point)}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

export default DumpServer;
