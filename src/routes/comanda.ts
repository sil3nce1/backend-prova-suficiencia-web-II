import { Router } from "express";
import ComandaController from "../controllers/ComandaController";
import { authMiddleware } from "../middlewares/authMiddleware";


const routes = Router();

/**
 * @swagger
 * /comandas:
 *  get:
 *    description: Obtém todas as comandas do banco de dados
 *    responses:
 *      '200':
 *        description: A successful response
 */
routes.get("/", authMiddleware, ComandaController.index);
routes.get("/:comandaId", authMiddleware, ComandaController.index);
routes.post("/", authMiddleware, ComandaController.create);
routes.put("/:comandaId", authMiddleware, ComandaController.update);
routes.delete("/:comandaId", authMiddleware, ComandaController.delete);

export default routes;