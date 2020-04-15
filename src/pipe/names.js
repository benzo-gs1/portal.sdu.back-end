function deepFreeze(object) {
  const isObject = obj => obj === Object(obj);

  let propNames = Object.getOwnPropertyNames(object);
  for (let name of propNames) {
    let value = object[name];
    object[name] = value && isObject(value) ? deepFreeze(value) : value;
  }

  return Object.freeze(object);
}

export default deepFreeze({
  server: {
    close: "server::close",
    setup: "server::setup",
  },
  mongo: {
    connected: "mongo::connected",
  },
});
