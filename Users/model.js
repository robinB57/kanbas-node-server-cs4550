import mongoose from "mongoose";
import schema, { userSchema } from "./schema";

const userModel = mongoose.model("UserModel", userSchema);

export default userModel;
