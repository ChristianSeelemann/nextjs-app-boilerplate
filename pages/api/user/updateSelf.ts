import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import User from "../../../app/models/userModel";
import apiWrapper from "../../../app/lib/apiWrapper";
import { User as UserType } from "../../../types/auth";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  apiWrapper(
    req,
    res,
    async (user: UserType) => {
      // Join lastOnline with data from body
      const join = Object.assign(req.body, { lastOnline: new Date() });
      // Fire the update
      if (user) {
        await User.findByIdAndUpdate(user._id, join);
        res.status(200).json("Succesfully updated");
      } else {
        res.status(401).json("Not authorized");
      }
    },
    true
  );
}
