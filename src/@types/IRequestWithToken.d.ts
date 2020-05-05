import { Request } from "express";

declare interface IRequestWithToken extends Request {
  token?: ITokenData;
}
