import runServer from "./src/app";
import config from "./src/config";
import dotenv from "dotenv";

dotenv.config();

runServer(config.server.port);
