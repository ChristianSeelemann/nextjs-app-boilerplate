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

  apiWrapper(req, res, async (user: UserType) => {
    if (user) {
      await User.findByIdAndUpdate(user._id, {
        colormode: req.body.colormode,
      });
      res.status(200).json({ user: req.body, token: req.query.token });
    } else {
      res.status(401).json(null);
    }
  });
}
