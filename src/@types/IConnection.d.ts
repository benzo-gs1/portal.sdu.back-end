import { Connection } from "mongoose";

declare interface IConnection {
  slow: Connection;
  fast: Connection;
}
