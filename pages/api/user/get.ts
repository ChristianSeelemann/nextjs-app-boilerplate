import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import User from "../../../app/models/userModel";
import Session from "../../../app/models/sessionModel";

type Data = {
  user: {
    _id: string;
    name: string;
    email: string;
    image: string;
    emailVerified: boolean;
    banned: boolean | null;
  };
  token: string | string[] | undefined;
} | null;

export default async function getUser(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connectMongo();

  const session = await Session.findOne({
    sessionToken: req.query.token,
  });

  if (req.query.api_key == process.env.API_KEY) {
    if (session) {
      const user = await User.findById(session.userId);

      const today = new Date();
      await Session.findOneAndUpdate(
        { sessionToken: req.query.token },
        { expires: today.setDate(today.getDate() + 30) }
      );
      res.status(200).json({ user: user, token: req.query.token });
    } else {
      const user = null;
      res.status(401).json(user);
    }
  } else {
    res.status(401).json(null);
  }
}
