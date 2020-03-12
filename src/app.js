import config from "./config";
import Loaders from "./loaders";

/**
 * Entry point of the system
 *
 * Initializing configurations & loaders
 */
async function main(args) {
  const { app } = await Loaders.init();

  app.listen(config.port, () => {
    console.log(`Server runs at port ${config.port}`);
  });
}

main(process.argv);
