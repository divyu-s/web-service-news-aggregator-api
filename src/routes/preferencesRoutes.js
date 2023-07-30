import express from "express";
import { verifyToken } from "../middlewares/authJWT.js";
import { retrivePrefrenceController } from "../controllers/retrivePrefrencesController.js";
import { putPrefrencesController } from "../controllers/putPrefrencesController.js";

const preferencesRoutes = express.Router();

preferencesRoutes.get("/preferences", verifyToken, retrivePrefrenceController);
preferencesRoutes.put("/preferences", verifyToken, putPrefrencesController);

export default preferencesRoutes;
