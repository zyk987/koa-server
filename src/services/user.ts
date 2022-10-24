import dbserver from "../dao/dbserver";

//用户详情
const buildUser = function (
  req: { body: { name: string; mail: string; pwd: string } },
  res: any
) {
  const { name, mail, pwd } = req.body;
  // name: string, mail: string, pwd: string,
  dbserver.buildUser(name, mail, pwd, res);
};

export default { buildUser };
