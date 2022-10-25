import { Server } from "http";
import Koa from "koa";
import router from "./router";
import koaBody from "koa-body";
import json from "koa-json";
import logger from "koa-logger";
import config from "./config";
import dotenv from "dotenv";
import "./controllers/index";

dotenv.config();

const app = new Koa();

app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild"
  );
  ctx.set("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  ctx.set("Content-Type", "application/json;charset=utf-8");
  if (ctx.request.method.toLowerCase() == "options") {
    ctx.state = 200; //让options尝试请求快速结束
  } else {
    await next();
  }
});

app.use(
  koaBody({
    multipart: true,
  })
);
app.use(json());
app.use(logger());

app.use(router.routes());

const runServer = (port: number): Server => {
  console.log("Server running on port 3300");
  return app.listen(port);
};
runServer(config.server.port);
