import { Router } from "express";
import pipe from "@/pipe";
import events from "@/pipe/names";

const router = Router();

router.get("/kill", (req, res) => {
  pipe.emit(events.server.close);
  return res.end();
});

router.get("/test", (req, res) => {
  res.send({ data: req.url });
});

const options = {
  isTest: true,
  tokenCheck: false,
  ipCheck: false,
  roleCheck: false,
};

export { options };

export default router;
