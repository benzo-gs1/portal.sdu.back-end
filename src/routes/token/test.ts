import { Router, Request, Response } from "express";
import TokenService from "@/services/token";
import middleware from "@/middleware";

const router = Router();

router.post("/generate", middleware.publicApi(), (req: Request, res: Response) => {
  const token = TokenService.create(req.body);

  return res.status(200).send({ token });
});

export default router;
