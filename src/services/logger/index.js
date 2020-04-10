import config from "@/config";

class Logger {
  static route(req) {
    if (config.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.info(`[${this.getCurrentTime()}] -> ${req.method} request at ${req.path}`);
    }
  }

  static fired(name) {
    if (config.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.warn(`[${this.getCurrentTime()}] -> ${name} event fired`);
    }
  }

  static handled(name, who, message) {
    if (config.isProduction) {
      // send task to job queue
    } else {
      // dev only
      console.log(
        `[${this.getCurrentTime()}] -> ${name} event handled by ${who}\nMessage: ${message}`
      );
    }
  }

  static getCurrentTime() {
    return new Date().toLocaleString();
  }
}

export default Logger;
