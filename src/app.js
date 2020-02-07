require("dotenv").config();

import express from "express";

const PORT = process.env.PORT || 80;

express().listen(PORT, () => console.log(`Server runs at port ${PORT}`));
