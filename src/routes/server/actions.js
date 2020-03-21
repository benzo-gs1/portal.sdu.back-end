import express from "express";
import { isProduction } from "@/config";

const router = express.Router();

if (!isProduction) {
  router.get("/kill", () => {
    
  });
}

export default router;