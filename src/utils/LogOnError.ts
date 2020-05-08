import Logger from "@/services/logger";

export function LogOnError(
  target: Function,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value as Function;

  descriptor.value = async function (...args: any[]) {
    try {
      return await originalMethod.apply(this, args);
    } catch (err) {
      Logger.error(target.name, err);
      return false;
    }
  };

  return descriptor;
}

export function LogOnErrorSync(
  target: Function,
  key: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value as Function;

  descriptor.value = function (...args: any[]) {
    try {
      return originalMethod.apply(this, args);
    } catch (err) {
      Logger.error(target.name, err);
      return false;
    }
  };

  return descriptor;
}
