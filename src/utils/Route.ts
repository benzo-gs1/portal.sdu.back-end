type method = "get" | "post" | "put" | "delete";
type ResponseData = Object | Array<any>;

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
  public data: ResponseData;
  constructor(message: string, code = 200, status = true, data = {}) {
    this.status = status;
    this.message = message;
    this.code = code;
    this.data = data;
  }

  public static say(message: string, code = 200, status = true) {
    return new RouteResponse(message, code, status);
  }

  public static deny(message: string, code = 400, status = false) {
    return new RouteResponse(message, code, status);
  }

  public say(message: string) {
    this.message = message;
    return this;
  }

  public send(data: ResponseData) {
    this.data = data;
    return this;
  }
  public http(code: number) {
    this.code = code;
    return this;
  }
  public stat(status: boolean) {
    this.status = status;
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

export function Public(target: any, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("public_or_private", "public", target[key]);
  return descriptor;
}

export function Private(target: any, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("public_or_private", "private", target[key]);
  return descriptor;
}

export function Protected(target: any, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("protected", true, target[key]);
  return descriptor;
}

export function Test(target: any, key: string, descriptor: PropertyDescriptor) {
  Reflect.defineMetadata("test", true, target[key]);
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
