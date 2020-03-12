import { Router } from "express";
import TokenService from "@/services/token";

const router = Router();

router.post("validate", (req, res) => {
  console.log(req.cookies);
  res.status(200).end();
});

export default router;
