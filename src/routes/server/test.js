import { Router } from "express";
import pipe from "@/pipe";
import events from "@/pipe/names";
import middleware from "@/middleware";

const router = Router();

router.get("/kill", middleware.publicApi(), (req, res) => {
  pipe.emit(events.server.close);
  return res.end();
});

router.get("/test", middleware.publicApi(), (req, res) => {
  res.send({ data: req.url });
});

export default router;
