import bcrypt from "bcrypt";
import { LogOnErrorSync } from "@/utils";

class CryptoService {
  @LogOnErrorSync
  static validatePasswords(data: string, encrypted: string): boolean {
    return bcrypt.compareSync(data, encrypted);
  }

  @LogOnErrorSync
  static hashPassword(p: string): string {
    return bcrypt.hashSync(p, bcrypt.genSaltSync(8));
  }
}

export default CryptoService;
