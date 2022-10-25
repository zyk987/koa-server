import { encryption, verification } from "../utils/bcrypt";
import { generateToken, verifyToken } from "../utils/jwt";
import dbmodels from "../models/dbmodels";
import { CallbackError } from "mongoose";

// 注册用户
const buildUser = async (name: string, mail: string, pwd: string) => {
  let password = encryption(pwd);
  let data = {
    name: name,
    email: mail,
    pwd: password,
    time: new Date(),
  };
  let user = new dbmodels.User(data);
  console.log(data);
  await user.save(function (err: CallbackError) {
    console.log(err);
    if (err) {
      return { code: 500, msg: "用户注册失败！", data: null };
    } else {
      return { code: 200, msg: "用户注册成功！", data: null };
    }
  });
};

// 匹配用户表元素个数
const countUserValue = function (data: any, type: string, res: any) {
  let wherestr: { [type: string]: any } = {};
  wherestr[type] = data;
  dbmodels.User.countDocuments(
    wherestr,
    function (err: CallbackError, result: string) {
      if (err) {
        res.status(500);
      } else {
        res.send({ status: 200, result });
      }
    }
  );
};

// 用户验证
const userMatch = function (data: any, pwd: string, res: any) {
  let wherestr = { $or: [{ name: data }, { email: data }] };
  let out = { name: 1, imgurl: 1, pwd: 1 };
  dbmodels.User.find(wherestr, out, function (err: Error, result: any) {
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
  dbmodels.User.find(wherestr, out, function (err: CallbackError, result: any) {
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
