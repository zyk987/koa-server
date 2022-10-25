import bcrypt from "bcryptjs";

//加密
const encryption = function (e: string) {
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(e, salt);
  return hash;
};

//解密
const verification = function (e: string, hash: string) {
  let verif = bcrypt.compareSync(e, hash);
  return verif;
};

export { encryption, verification };
