import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../app/lib/dbConnectionAPI";
import apiWrapper from "../../../app/lib/apiWrapper";
import User from "../../../app/models/userModel";
import type { User as UserType } from "../../../types/auth";
import Session from "../../../app/models/sessionModel";
import Account from "../../../app/models/accountModel";

export default async function meUser(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();

  apiWrapper(
    req,
    res,
    async (user: UserType) => {
      // Just return the user data when method is GET
      if (req.method === "GET") {
        res.status(200).json({ user: user, token: req.query.token });

        // Update the user when method is POST
      } else if (req.method === "POST") {
        // Check if body is not empty
        if (Object.keys(req.body).length > 0) {
          // Join lastOnline with data from body
          const join = Object.assign(req.body, { lastOnline: new Date() });
          // Fire the update
          if (user) {
            await User.findByIdAndUpdate(user._id, join);
            res.status(200).json("Succesfully updated");
          } else {
            res.status(401).json("Not authorized");
          }
          // When body is empty, just update lastOnline
        } else {
          // Fire the update
          if (user) {
            // Check if there is a lastOnline yet
            if (user.lastOnline) {
              // Check if lastOnline is older than 3 minutes
              const lastSeen = Math.floor(
                new Date(user.lastOnline).getTime() / 1000
              );
              const threeMinutesAgo =
                Math.floor(new Date().getTime() / 1000) - 180;
              if (lastSeen - threeMinutesAgo < 0) {
                await User.findByIdAndUpdate(user._id, {
                  lastOnline: new Date(),
                });
                res.status(200).json("Succesfully updated");
                // When lastOnline is not older than 3 minutes, dont update
              } else {
                res.status(200).json("Not updated");
              }
              // When there is no lastOnline yet, update
            } else {
              await User.findByIdAndUpdate(user._id, {
                lastOnline: new Date(),
              });
            }
            // Check if there is an alias yet. No? Set it.
            if (!user.alias) {
              const alias = user.name.replace(/\s/g, "").toLowerCase();
              await User.findByIdAndUpdate(user._id, {
                alias: alias,
              });
            }
            // When user is not valid return auth error
          } else {
            res.status(401).json("Not authorized");
          }
        }

        // Delete the user when method is DELETE
      } else if (req.method === "DELETE") {
        if (user) {
          // Delte User
          await User.findByIdAndDelete(user._id);
          // Delete Sessions
          await Session.deleteMany({ userId: user._id });
          // Delete Accounts
          await Account.deleteMany({ userId: user._id });
          res.status(200).json("Succesfully deleted");
        } else {
          res.status(401).json("Not authorized");
        }
        // Return error when method is not GET or POST
      } else {
        res.status(405).json("Method not allowed");
      }
    },
    true
  );
}
