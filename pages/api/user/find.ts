import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import apiWrapper from "../../../app/lib/apiWrapper";
import User from "../../../app/models/userModel";
import type { User as UserType } from "../../../types/auth";
import Session from "../../../app/models/sessionModel";
import Account from "../../../app/models/accountModel";

export default async function findUsers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  apiWrapper(req, res, async (user: UserType) => {
    // Just return the user data when method is GET
    if (req.method === "GET") {
      // Get all users when no id is present
      if (!req.query.id) {
        const users = await User.find({});
        // Return users when users are found
        if (users) {
          res.status(200).json(users);
          // Return error when no users are found
        } else {
          res.status(404).json({ message: "No users found" });
        }
      }
      // Get user by id when id is present
      else {
        const user = await User.findById(req.query.id);
        // Return user when user is found
        if (user) {
          res.status(200).json({ user });
          // Return error when no user is found
        } else {
          res.status(404).json({ message: "No user found" });
        }
      }

      // Return error when method is not GET or POST
    } else {
      res.status(405).json("Method not allowed");
    }
  });
}
