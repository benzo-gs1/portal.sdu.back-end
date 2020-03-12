import express from "express";
import cors from "cors";
import { json } from "body-parser";
import cookie from "cookie-parser";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(helmet());
app.use(json());
app.use(cookie());

export default app;
