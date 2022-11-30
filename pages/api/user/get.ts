import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import User from "../../../app/models/userModel";
import Session from "../../../app/models/sessionModel";
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
    const user = await User.findById(session.userId);

    const today = new Date();
    await Session.findOneAndUpdate(
      { sessionToken: req.query.token },
      { expires: today.setDate(today.getDate() + 30) }
    );
    res.status(200).json({ user: user, token: req.query.token });
  });
}
