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

router.get("/validate", (req, res) => {
  const token = TokenService.bearerParser(req.headers["authorization"]);
  const result = TokenService.validate(token);

  if (result) return res.status(200).send(result);
  return res.sendStatus(406);
});

const options = {
  isTest: true,
  tokenCheck: false,
  ipCheck: false,
  roleCheck: false,
};

export { options };

export default router;
