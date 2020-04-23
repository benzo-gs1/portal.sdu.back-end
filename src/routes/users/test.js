import { Router } from "express";
import UsersService from "@/services/users";

const router = Router();

router.post("/create", async (req, res) => {
  const result = await UsersService.create(req.body);

  return res.status(result.status ? 200 : 406).send(result);
});

const options = {
  isTest: true,
  tokenCheck: false,
  ipCheck: false,
  roleCheck: false,
};

export { options };

export default router;
