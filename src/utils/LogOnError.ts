import Logger from "@/services/logger";

export default function LogOnError(
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
    }
  };

  return descriptor;
}
