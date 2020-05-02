import { Router } from "express";
import middleware from "@/middleware";

const router = Router();

router.get(
  "/validate",
  middleware.publicApi(),
  middleware.authorization(),
  (req, res) => {
    res.status(200).send({ status: true });
  }
);

export default router;
