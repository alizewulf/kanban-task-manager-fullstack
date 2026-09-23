import express from "express";
import cors from "cors";
import usersRouter from "../modules/users/users.routes.js";
import columnsRouter from '../modules/columns/column.route.js'
import { server_config } from "../config/config.js";
import categoryRouter from "../modules/task_categories/category.route.js";

function startServer() {
    const app = express();

    app.use(cors());
    app.use(express.json());

    app.get("/", (_req, res) => {
        res.send("hello express");
    });

    app.use("/users", usersRouter);
    app.use("/columns", columnsRouter)
    app.use("/columns", categoryRouter)
    
    app.listen(server_config.port, () => {
        console.log(
            `Server is running on ${server_config.host}:${server_config.port}`,
        );
    });
}

export default startServer;