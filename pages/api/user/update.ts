import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import User from "../../../app/models/userModel";
import apiWrapper from "../../../app/lib/apiWrapper";

type Data = {
  user: {
    _id: string;
    name: string;
    email: string | null;
    image: string;
    emailVerified: boolean;
    banned: boolean | null;
    nickname: string | null;
    colormode: string | null;
  };
  token: string | string[] | undefined;
} | null;

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectMongo();

  apiWrapper(req, res, async (session: any) => {
    await User.findByIdAndUpdate(session.userId, {
      colormode: req.body.colormode,
    });
    res.status(200).json({ user: req.body, token: req.query.token });
  });
}
