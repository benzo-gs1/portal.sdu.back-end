import "reflect-metadata";
import config from "@/config";
import Loaders from "@/loaders";
import Logger from "@/services/logger";

/**
 * Entry point of the system
 *
 * Initializing configurations & loaders
 */
async function main(args: string[]): Promise<void> {
  const { app, connection } = await Loaders.init(args);

  const server = app.listen(config.port, () =>
    Logger.log(`Server started at port ${config.port}`)
  );

  config.setConfig("server", server);
  config.setConfig("mongoConnection", connection);
}

main(process.argv);
