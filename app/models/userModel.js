import { Schema, models, model } from "mongoose";

const userSchema = new Schema({
  name: String,
  email: String,
  image: String,
  emailVerified: {
    type: null || Boolean,
    default: false,
  },
  banned: {
    type: null || Boolean,
    default: false,
  },
  role: null || [String],
  nickname: String || null,
  colormode: String || null,
  lastOnline: Date || null,
  bannedReason: String || null,
  bannedUntil: Number || null,
  alias: String || null,
  firstName: String || null,
  lastName: String || null,
  privacy: {
    showLastOnline: {
      type: null || Boolean,
      default: true,
    },
  },
});

const User = models.User || model("User", userSchema);

export default User;
