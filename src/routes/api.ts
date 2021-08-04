import { Router } from "express";
import comandaRoutes from "./comanda";
import accountRoutes from "./account";
import authRoutes from "./auth";

const routes = Router();


routes.use("/accounts", accountRoutes);
routes.use("/auth", authRoutes);
routes.use("/comandas", comandaRoutes);


export default routes;