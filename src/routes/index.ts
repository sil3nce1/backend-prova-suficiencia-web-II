import { Router } from "express";
import apiRoutes from "./api";


const routes = Router();


routes.use("/RestAPIFurb", apiRoutes);


export default routes;