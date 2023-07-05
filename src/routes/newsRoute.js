import express from "express";
import { verifyToken } from "../middlewares/authJWT.js";
import { getNewsController } from "../controllers/getNewsController.js";

const newsRoutes = express.Router();

newsRoutes.get("/news", verifyToken, getNewsController);

export default newsRoutes;
