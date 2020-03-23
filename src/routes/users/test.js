import { Router } from "express";
import UsersService from "@/services/users";

const router = Router();

router.post("/create", (req, res) => {
  UsersService.create(req.body);
  res.sendStatus(200);
});

export default router;
