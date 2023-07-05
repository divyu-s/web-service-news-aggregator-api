import express from "express";
import { signUpController } from "../controllers/signUpController.js";
import { signInController } from "../controllers/signInController.js";

const registrationRoutes = express.Router();

registrationRoutes.post("/signUp", signUpController);
registrationRoutes.post("/signIn", signInController);

export default registrationRoutes;
