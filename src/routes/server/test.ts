import { Router, Request, Response } from "express";
import pipe from "@/pipe";
import middleware from "@/middleware";
import { EventNames } from "@/@types";

const router = Router();

router.put("/kill", middleware.publicApi(), (req: Request, res: Response) => {
  pipe.emit(EventNames.SERVER_CLOSE);
  return res.end();
});

export default router;
