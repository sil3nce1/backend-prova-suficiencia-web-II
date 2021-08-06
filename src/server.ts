
require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../swagger.json";


createConnection();


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const PORT = 8080;


app.listen(PORT, () => console.log("Server working on port " + PORT));
