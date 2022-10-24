import mongoose from "mongoose";

const db = mongoose.createConnection("mongodb://127.0.0.1:27017/koaServer");

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.info("数据库连接成功！");
});

export default db;
