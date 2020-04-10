import UsersModel from "../../models/users";
import bcrypt from "bcrypt";
import pipe from "@/pipe";

class UsersService {
  static async create(data) {
    try {
      data.password = this.hashPassword(data.password);

      const user = new UsersModel(data);
      return {
        status: true,
        user: await user.save(),
      };
    } catch (error) {
      return {
        status: false,
        error,
      };
    }
  }

  static async findByUsername(username) {
    return await UsersModel.findOne({ username }).exec();
  }

  static validatePasswords(data, encrypted) {
    return bcrypt.compareSync(data, encrypted);
  }

  static hashPassword(p) {
    return bcrypt.hashSync(p, bcrypt.genSaltSync(8));
  }
}

pipe.on("server::setup", () => {
  console.info("| UsersService ready");
});

export default UsersService;
