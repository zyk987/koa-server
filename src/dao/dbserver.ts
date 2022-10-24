import { encryption, verification } from "./bcrypt";
import { generateToken, verifyToken } from "./jwt";
const dbmodel = require("../model/dbmodel");
const User = dbmodel.model("User");

// 注册用户
const buildUser = function (name: string, mail: string, pwd: string, res: any) {
  let password = encryption(pwd);
  let data = {
    name: name,
    email: mail,
    pwd: password,
    time: new Date(),
  };
  let user = new User(data);

  user.save(function (err: Error) {
    if (err) {
      res.send({ status: 500, msg: "用户注册失败！" });
    } else {
      res.send({ status: 200, msg: "用户注册成功！" });
    }
  });
};

// 匹配用户表元素个数
const countUserValue = function (data: any, type: string, res: any) {
  let wherestr: { [type: string]: any } = {};
  wherestr[type] = data;
  User.countDocuments(wherestr, function (err: Error, result: string) {
    if (err) {
      res.status(500);
    } else {
      res.send({ status: 200, result });
    }
  });
};

// 用户验证
const userMatch = function (data: any, pwd: string, res: any) {
  let wherestr = { $or: [{ name: data }, { email: data }] };
  let out = { name: 1, imgurl: 1, pwd: 1 };
  User.find(wherestr, out, function (err: Error, result: any) {
    if (err) {
      res.send({ status: 500 });
    } else {
      if (result == "") {
        res.send({ status: 400, msg: "用户不存在！" });
      }
      result.map((e: any) => {
        const pwdMatch = verification(pwd, e.pwd);
        if (pwdMatch) {
          let token = generateToken(e._id);
          let data = {
            id: e._id,
            name: e.name,
            imgurl: e.imgurl,
            token: token,
          };
          res.send({ status: 200, data });
        } else {
          res.send({ status: 400, msg: "用户密码错误！" });
        }
      });
    }
  });
};

// 搜索用户
const searchUser = function (data: any, res: any) {
  let wherestr;
  if (data == "talky") {
    wherestr = {};
  } else {
    wherestr = {
      $or: [{ name: { $regex: data } }, { email: { $regex: data } }],
    };
  }
  let out = {
    name: 1,
    email: 1,
    imgurl: 1,
  };
  User.find(wherestr, out, function (err: Error, result: any) {
    if (err) {
      res.send({ status: 500 });
    } else {
      res.send({ status: 200, result });
    }
  });
};

export default {
  buildUser,
  countUserValue,
  searchUser,
};
