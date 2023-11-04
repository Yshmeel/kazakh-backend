import * as dotenv from "dotenv";
import http from './src/transports/http'
import mysql from "./src/database/mysql";

(async function() {
    dotenv.config();
    const knex = await mysql.init();
    http.initialize(knex);
}());
