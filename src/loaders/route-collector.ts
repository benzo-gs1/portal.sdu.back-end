import { readdirSync, statSync } from "fs";
import { join } from "path";
import { Router } from "express";
import config from "@/config";

/**
 * Collects the routes from @origin directory
 *
 * @param origin - directory to collect from
 * @param ignore - array of ignored folders or files
 * @param router - express.Router to be attached with
 *
 * @returns express.Router containing all the routes from given origin
 */
export default async function collector(
  origin: string,
  router = Router(),
  root = origin
) {
  const base = join(__dirname, "../", origin);
  const items = readdirSync(base);

  items.forEach((item) => {
    let pathToItem = join(origin, item);

    const status = statSync(join(base, item));

    if (status.isDirectory()) collector(pathToItem, router, root);
    else if (status.isFile()) {
      const sliced = origin.replace(root, "");
      const isIgnoring = config.ignoredRoutes.find((i) =>
        new RegExp(i, "ig").test(pathToItem)
      );

      if (config.isProduction && isIgnoring) return;

      router.use(sliced, require(join(base, item)).default as Router);
    }
  });

  return router;
}
