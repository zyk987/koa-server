import * as mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/koaServer");

const db = mongoose.connection;

db.on("connected", function (err) {
  if (err) {
    console.log("连接数据库失败：" + err);
  } else {
    console.log("连接数据库成功！");
  }
});

export default db;
