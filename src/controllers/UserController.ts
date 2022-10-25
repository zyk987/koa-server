import { get, post, controller } from "../decorator/index";
import UserService from "../services/UserService";

@controller("/user")
class UserController {
  @post("/add")
  async getName(ctx: any) {
    // console.log(name);
    console.log(ctx.request.body);
    const res = await UserService.buildUser(ctx.request.body);
    console.log(res);
    ctx.body = res;
  }

  @get("/all")
  async postName(ctx: any, res: any) {
    const { name } = ctx.request.body;
    console.log(ctx, res);
  }
}
