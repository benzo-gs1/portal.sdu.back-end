import { Router } from "express";
import config from "@/config";
import pipe from "@/pipe";

const router = Router();

if (!config.isProduction) {
  router.post("/kill", (req, res) => {
    pipe.emit("server::close");
    return res.end();
  });
}

export default router;
