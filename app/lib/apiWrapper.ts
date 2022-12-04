import { NextApiRequest, NextApiResponse } from "next";
import Session from "../../app/models/sessionModel";
import User from "../../app/models/userModel";
import { User as UserType } from "../../types/auth";

export default async function apiWrapper(
  req: NextApiRequest,
  res: NextApiResponse,
  callback: (session: UserType) => void,
  isLoggedIn?: boolean,
  role?: string
) {
  // Check the API Key
  if (req.query.api_key === process.env.API_KEY) {
    // Check if logged user is needed
    if (isLoggedIn) {
      // Check if token is present
      if (req.query.token) {
        // Get session informations
        const session = await Session.findOne({
          sessionToken: req.query.token,
        });
        // Check if session is valid
        if (session) {
          // When session is valid get user informations
          const user = await User.findById(session.userId);
          // Check if user is valid
          if (user) {
            // Set new expiration date for session
            const today = new Date();
            await Session.findOneAndUpdate(
              { sessionToken: session.sessionToken },
              { expires: today.setDate(today.getDate() + 30) }
            );
            // Check if a specific role is required
            if (role) {
              // Check if user has the required role
              if (user.role.includes(role)) {
                callback(user);
                // When user doesn't have the required role return auth error
              } else {
                res.status(401).json(null);
              }
              // When not, call the callback function
            } else {
              callback(user);
            }
            // When user is not valid return auth error
          } else {
            res.status(401).json(null);
          }
          // When session is invalid return auth error
        } else {
          res.status(401).json(null);
        }
        // When token is missing return auth error
      } else {
        res.status(401).json(null);
      }
      // When no logged user is needed, skip the session check
    } else {
      callback(null);
    }
    // When API Key is wrong or missing return auth error
  } else {
    res.status(401).json(null);
  }
}
