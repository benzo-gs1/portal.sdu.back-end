import * as bcrypt from "bcrypt";

class CryptoService {
  static validatePasswords(data: string, encrypted: string) {
    return bcrypt.compareSync(data, encrypted);
  }

  static hashPassword(p: string) {
    return bcrypt.hashSync(p, bcrypt.genSaltSync(8));
  }
}

export default CryptoService;
