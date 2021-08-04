import { Router } from "express";
import AuthController from "../controllers/AuthController";


const routes = Router();


routes.post("/signIn", AuthController.signIn);

export default routes;