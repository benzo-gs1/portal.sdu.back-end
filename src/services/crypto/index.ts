import bcrypt from "bcrypt";
import { LogOnError } from "@/utils";

class CryptoService {
  @LogOnError
  static validatePasswords(data: string, encrypted: string) {
    return bcrypt.compareSync(data, encrypted);
  }

  @LogOnError
  static hashPassword(p: string) {
    return bcrypt.hashSync(p, bcrypt.genSaltSync(8));
  }
}

export default CryptoService;
