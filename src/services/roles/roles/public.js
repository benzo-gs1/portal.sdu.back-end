const role = {
  level: 0,
  title: "public",
  actions: [
    {
      path: "/token/validate",
      allowed: true,
    },
    {
      path: "/users/validate-credentials",
      allowed: true,
    },
  ],
  modules: {},
  extends: [],
};

export default role;
