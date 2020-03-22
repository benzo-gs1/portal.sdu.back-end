import mongoose from "mongoose";

export async function init() {
  await mongoose.connect();
}
