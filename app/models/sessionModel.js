import { ObjectId } from "mongodb";
import { Schema, models, model } from "mongoose";

const sessionSchema = new Schema({
  sessionToken: { type: String, required: true },
  expires: { type: Date, required: true },
  userId: { type: ObjectId, required: true },
});

const Session = models.Session || model("Session", sessionSchema);

export default Session;
