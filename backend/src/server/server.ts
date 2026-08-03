import express from "express";
import { server_config } from "./config";

function startServer() {
  const app = express();

  app.use(express.json());

  app.listen(server_config.port, () => {
    console.log(
      `Server is running on ${server_config.host}:${server_config.port}`,
    );
  });
}

export default startServer