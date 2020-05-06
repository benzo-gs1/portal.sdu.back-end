type method = "get" | "post" | "put" | "delete";

export interface RouteDefinition {
  // Path to our route
  path: string;
  // HTTP Request method (get, post, ...)
  requestMethod: method;
  // Method name within our class responsible for this route
  methodName: string;
}

export interface RouteResponse {
  status: boolean;
  message: string;
  code: number;
  [index: string]: Object | Array<any>;
}

function setRoute(target: Function, http: method, path: string, name: string) {
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
  return (methodClass: Function, methodName: string) => {
    setRoute(methodClass, "get", path, methodName);
  };
}

export function Post(path: string) {
  return (methodClass: Function, methodName: string) => {
    setRoute(methodClass, "post", path, methodName);
  };
}

export function Put(path: string) {
  return (methodClass: Function, methodName: string) => {
    setRoute(methodClass, "put", path, methodName);
  };
}

export function Delete(path: string) {
  return (methodClass: Function, methodName: string) => {
    setRoute(methodClass, "delete", path, methodName);
  };
}

export function Controller(prefix: string): ClassDecorator {
  return function (constructor: Function) {
    Reflect.defineMetadata("prefix", prefix, constructor);

    if (!Reflect.hasMetadata("routes", constructor)) {
      Reflect.defineMetadata("routes", [], constructor);
    }
  };
}
