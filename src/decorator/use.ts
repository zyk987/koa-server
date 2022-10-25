import "reflect-metadata";

export function use(
  middleware: (ctx: any, next: any) => Promise<any>,
  position: "last" | number = "last"
) {
  return function (target: any, key: string) {
    const middlewares = Reflect.getMetadata("middlewares", target, key) || [];
    if (position === "last") {
      middlewares.push(middleware);
    } else {
      middlewares.splice(position, 0, middleware);
    }
    Reflect.defineMetadata("middlewares", middlewares, target, key);
  };
}
