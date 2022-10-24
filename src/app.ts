import { Server } from "http";
import Koa from "koa";
import router from "./router";

const app = new Koa();

app.use(router.routes());
app.use(router.allowedMethods());

const runServer = (port: number): Server => {
  console.log("Server running on port 3300");
  return app.listen(port);
};

export default runServer;
