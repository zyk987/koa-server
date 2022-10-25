import mongoose from "mongoose";
import db from "../db";

const { Schema } = mongoose;
//用户表
const UserSchema = new Schema({
  //用户名
  name: { type: String },
  //密码
  pwd: { type: String },
  //邮箱
  email: { type: String },
  //性别
  sex: { type: String, default: "asexual" },
  //生日
  birth: { type: Date },
  //电话
  phone: { type: Number },
  //介绍
  explain: { type: String },
  //头像地址
  imgurl: { type: String, default: "/user/user.png" },
  //注册时间
  time: { type: Date },
});

const User = mongoose.model("User", UserSchema);

export default { User };
