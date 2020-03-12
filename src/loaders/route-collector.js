import { readdir, stat } from "fs";
import { join } from "path";
import { Router } from "express";
import { assert } from "chai";

/**
 * Collects the routes from @origin directory
 *
 * @param origin - directory to collect from
 * @param ignore - array of ignored folders or files
 * @param router - express.Router to be attached with
 *
 * @returns express.Router containing all the routes from given origin
 */
export default async function collector(origin, ignore = [], router = Router()) {
  readdir(origin, (err, files) => {
    assert.equal(err, undefined, "Route Collector could not find a given origin");

    files.forEach(file => {
      let fromPath = join(origin, file);

      stat(fromPath, (error, stat) => {
        if (error) {
          console.log(error);
          return;
        }

        if (stat.isFile()) {
          const sliced = origin.slice(7);
          const toBreak = ignore.find(item => sliced.includes(item));

          if (!toBreak) {
            router.use(join("/", sliced), require(join("./", fromPath)));
          }
        } else if (stat.isDirectory()) {
          collector(fromPath, ignore, router);
        }
      });
    });
  });
  return router;
}
