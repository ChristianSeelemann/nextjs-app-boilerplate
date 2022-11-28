import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: null || Boolean,
  banned: null || Boolean,
  role: null || [String],
});

const User = models.User || model("User", userSchema);

export default User;
