import { Router, Request, Response } from "express";
import middleware from "@/middleware";

const router = Router();

router.get(
  "/validate",
  middleware.publicApi(),
  middleware.authorization(),
  (req: Request, res: Response) => {
    res.status(200).send({ status: true });
  }
);

export default router;
