import config from "@/config";
import { Request } from "express";
import { EventNames } from "@/@types";

class Logger {
  static route(req: Request): void {
    if (config.isProduction) {
      // send task to job queue
    } else if (!config.isTesting) {
      // dev only
      console.info(
        `[${this.getCurrentTime()}] -> ${req.method} REQUEST at ${req.originalUrl}`
      );
    }
  }

  static fired(name: EventNames | string): void {
    if (config.isProduction) {
      // send task to job queue
    } else if (!config.isTesting) {
      // dev only
      console.warn(`[${this.getCurrentTime()}] -> EVENT fired: ${name}`);
    }
  }

  static handled(name: EventNames, who: string, message: string): void {
    if (config.isProduction) {
      // send task to job queue
    } else if (!config.isTesting) {
      // dev only
      console.info(
        `[${this.getCurrentTime()}] -> ${name} EVENT handled | ${who} is: ${message}`
      );
    }
  }

  static error(who: string, message: string): void {
    if (config.isProduction) {
      // send task to job queue
    } else if (!config.isTesting) {
      // dev only
      console.error(`[${this.getCurrentTime()}] -> ERROR at ${who}\nMessage: ${message}`);
    }
  }

  static log(message: string): void {
    if (config.isProduction) {
      // send task to job queue
    } else if (!config.isTesting) {
      // dev only
      console.log(`[${this.getCurrentTime()}] -> LOG: ${message}`);
    }
  }

  static getCurrentTime(): string {
    return new Date().toLocaleString();
  }
}

export default Logger;
