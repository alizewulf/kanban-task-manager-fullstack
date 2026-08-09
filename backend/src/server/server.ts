import express from "express";
import { server_config } from "./config.js";
import users from '../data/users/users.json' with {type: "json"};
import cors from "cors"

function startServer() {
  const app = express();
  app.use(cors())
  app.get("/", (_req, res) => {
    res.send("hello express");
  });
  
  app.get("/users", (_req, res) => {
    res.send(users);
  });
  
  app.listen(server_config.port, () => {
    console.log(
      `Server is running on ${server_config.host}:${server_config.port}`,
    );
  });
}

export default startServer;