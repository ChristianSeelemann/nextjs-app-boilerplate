import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import apiWrapper from "../../../app/lib/apiWrapper";
import { User } from "../../../types/auth";

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  apiWrapper(
    req,
    res,
    async (user: User) => {
      // Just return the user data
      res.status(200).json({ user: user, token: req.query.token });
    },
    true
  );
}
