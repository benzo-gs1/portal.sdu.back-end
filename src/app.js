require("dotenv").config();

import express from "express";

const PORT = process.env.PORT || 80;
const app = express();

app.listen(PORT, () => console.log(`Server runs at port ${PORT}`));
