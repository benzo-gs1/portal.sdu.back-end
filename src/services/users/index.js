import UsersModel from "../../models/users";
import bcrypt from "bcrypt";

class UsersService {
  static async create(data) {
    try {
      data.password = this.hashPassword(data.password);

      const user = new UsersModel(data);
      return {
        status: true,
        result: await user.save()
      };
    } catch (error) {
      return {
        status: false,
        result: error
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

export default UsersService;
