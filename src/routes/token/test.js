import { Router } from "express";
import TokenService from "@/services/token";

const router = Router();

router.post("/generate", (req, res) => {
  const token = TokenService.create(req.body);

  if (token) {
    return res.status(200).send({ token });
  }
  return res.status(400).send({ error: "payload required" });
});

export default router;
