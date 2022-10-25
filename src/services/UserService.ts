import dbserver from "../dao/dbserver";

//用户详情
const buildUser = async (body: { name: string; mail: string; pwd: string }) => {
  const { name, mail, pwd } = body;
  // name: string, mail: string, pwd: string,
  const res = await dbserver.buildUser(name, mail, pwd);
  return res;
};

export default { buildUser };
