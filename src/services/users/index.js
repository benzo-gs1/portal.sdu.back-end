import UsersModel from "@/models/users";

class UsersService {
  static create(data) {
    try {
      const user = new UsersModel(data);
      user.save();
      return true;
    } catch (error) {
      return false;
    }
  }

  static validatePasswords(p1, p2) {
    
  }
}

export default UsersService;
