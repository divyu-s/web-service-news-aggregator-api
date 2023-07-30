import express from "express";
import { signUpController } from "../controllers/signUpController.js";
import { signInController } from "../controllers/signInController.js";

const registrationRoutes = express.Router();

registrationRoutes.post("/register", signUpController);
registrationRoutes.post("/login", signInController);

export default registrationRoutes;
