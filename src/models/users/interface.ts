import { Document } from "mongoose";
import { Languages } from "@/@types";

export default interface IUser extends Document {
  username: string;
  password: string;
  language: Languages;
  roles: number[];
  widgets: number[];
}
