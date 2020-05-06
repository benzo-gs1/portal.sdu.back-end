type method = "get" | "post" | "put" | "delete";
type ResponseData = Object | Array<any>;
type routeAccess = "public" | "private";

export interface RouteDefinition {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: method;
  // Method name within our class responsible for this route
  methodName: string;
}

export class RouteResponse {
  public status: boolean;
  public message: string;
  public code: number;
  public data?: ResponseData;
  constructor(message: string, code = 200, status = true) {
    this.status = status;
    this.message = "";
    this.code = code;
  }

  public static say(message: string, code = 200, status = true) {
    return new RouteResponse(message, code, status);
  }

  public send(data: ResponseData) {
    this.data = data;
    return this;
  }
}

function setRoute(target: Object, http: method, path: string, name: string) {
  if (!Reflect.hasMetadata("routes", target.constructor)) {
    Reflect.defineMetadata("routes", [], target.constructor);
  }

  const routes = Reflect.getMetadata("routes", target.constructor) as RouteDefinition[];
  routes.push({
    requestMethod: http,
    path,
    methodName: name,
  });
  Reflect.defineMetadata("routes", routes, target.constructor);
}

export function Get(path: string) {
  return (methodClass: Object, methodName: string) => {
    setRoute(methodClass, "get", path, methodName);
  };
}

export function Post(path: string) {
  return (methodClass: Object, methodName: string) => {
    setRoute(methodClass, "post", path, methodName);
  };
}

export function Put(path: string) {
  return (methodClass: Object, methodName: string) => {
    setRoute(methodClass, "put", path, methodName);
  };
}

export function Delete(path: string) {
  return (methodClass: Object, methodName: string) => {
    setRoute(methodClass, "delete", path, methodName);
  };
}

export function Public(target: Object, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("public_or_private", "public", target);
  return descriptor;
}

export function Private(target: Object, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("public_or_private", "private", target);
  return descriptor;
}

export function Protected(target: Object, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("protected", true, target);
  return descriptor;
}

export function Test(target: Object, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("test", true, target);
  return descriptor;
}

export function Controller(prefix: string): ClassDecorator {
  return function (constructor: Function) {
    Reflect.defineMetadata("prefix", prefix, constructor);

    if (!Reflect.hasMetadata("routes", constructor)) {
      Reflect.defineMetadata("routes", [], constructor);
    }
  };
}
