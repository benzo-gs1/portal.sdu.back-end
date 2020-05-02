import { Router } from "express";
import pipe from "@/pipe";
import events from "@/pipe/names";
import middleware from "@/middleware";

const router = Router();

router.put("/kill", middleware.publicApi(), (req, res) => {
  pipe.emit(events.server.close);
  return res.end();
});

export default router;
