import { Router } from "express";
import UsersService from "@/services/users";
import middleware from "@/middleware";

const router = Router();

router.post("/create", middleware.publicApi(), async (req, res) => {
  const result = await UsersService.create(req.body);

  if (result.status) return res.status(200).send(status);

  return res.status(400).send({
    status: false,
    message: result.error,
  });
});

export default router;
