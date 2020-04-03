import config from "./config";
import { setConfig } from "./config";
import Loaders from "./loaders";
import morgan from 'morgan'
import fs from 'fs'
import path from 'path'


/**
 * Entry point of the system
 *
 * Initializing configurations & loaders
 */
async function main(args) {
  const { app } = await Loaders.init(args);

  const server = app.listen(config.port, () => {
    console.log(`Server runs at port ${config.port}`);
  });

  const accessLogStream = fs.createWriteStream(path.join(__dirname, '../logs/access.log'), { flags: 'a' });

  app.use(morgan(':date[clf] -> :method :url :status', { stream: accessLogStream }));

  setConfig("server", server);
}

main(process.argv);
