import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const accountSchema = new Schema({
  provider: String,
  type: String,
  providerAccountId: String,
  access_token: String,
  expires_at: Number,
  refresh_token: String,
  scope: String,
  token_type: String,
  userId: { type: ObjectId, required: true },
});

const Account = models.Account || model("Account", accountSchema);

export default Account;
