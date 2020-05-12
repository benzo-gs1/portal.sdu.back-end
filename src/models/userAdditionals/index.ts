import IUserAdditional from "./interface";
import AdditionalsSchema from "./schema";
import { IModel, ModelNames } from "@/@types";
import { createModels } from "@/utils";

const models: IModel<IUserAdditional> = createModels(ModelNames.USERS, AdditionalsSchema);

export default models;
