import { Router } from "express";
import TokenService from "@/services/token";
import middleware from "@/middleware";

const router = Router();

router.post("/generate", middleware.publicApi(), (req, res) => {
  const token = TokenService.create(req.body);

  if (token) {
    return res.status(200).send({ token });
  }
  return res.status(400).send({ error: "payload required" });
});

router.get("/validate", middleware.publicApi(), (req, res) => {
  const token = TokenService.bearerParser(req.headers["authorization"]);
  const result = TokenService.validate(token);

  if (result) return res.status(200).send(result);
  return res.sendStatus(406);
});

export default router;
