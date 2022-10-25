import "reflect-metadata";

function genRequestDecorator(type: string) {
  return function (path: string) {
    return function (target: any, key: string) {
      Reflect.defineMetadata("path", path, target, key);
      Reflect.defineMetadata("method", type, target, key);
    };
  };
}

export const get = genRequestDecorator("get");
export const post = genRequestDecorator("post");
