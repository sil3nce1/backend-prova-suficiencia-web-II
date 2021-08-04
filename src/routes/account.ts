import { Router } from "express";
import AccountController from "../controllers/AccountController";
import { authMiddleware } from "../middlewares/authMiddleware";

const routes = Router();



routes.get("/", authMiddleware, AccountController.index);
routes.post("/", AccountController.create);


export default routes;