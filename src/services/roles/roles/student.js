const role = {
  level: 1,
  title: "student",
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
  extends: ["public"],
};

export default role;
