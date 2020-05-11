import IUser from "./interface";
import UserSchema from "./schema";
import { IModel, ModelNames } from "@/@types";
import { createModels } from "@/utils";

const models: IModel<IUser> = createModels(ModelNames.USERS, UserSchema);

export default models;
