import { Router } from "express";
import ComandaController from "../controllers/ComandaController";
import { authMiddleware } from "../middlewares/authMiddleware";


const routes = Router();


routes.get("/", authMiddleware, ComandaController.index);
routes.get("/:comandaId", authMiddleware, ComandaController.index);
routes.post("/", authMiddleware, ComandaController.create);
routes.put("/:comandaId", authMiddleware, ComandaController.update);
routes.delete("/:comandaId", authMiddleware, ComandaController.delete);

export default routes;