
require('dotenv').config();
import "reflect-metadata";
import { createConnection } from "typeorm";
import app from "./app";

createConnection();


const PORT = 8080;


app.listen(PORT, () => console.log("Server working on port " + PORT));
