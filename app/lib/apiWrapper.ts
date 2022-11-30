import Session from "../../app/models/sessionModel";

export default async function apiWrapper(req: any, res: any, callback: any) {
  // Check if token is present
  if (req.query.token) {
    const session = await Session.findOne({
      sessionToken: req.query.token,
    });
    // Check if API Key is valid
    if (req.query.api_key == process.env.API_KEY) {
      // Check if session is valid
      if (session) {
        callback(session);
        // Session is invalid
      } else {
        const user = null;
        res.status(401).json(user);
      }
      // API Key is invalid
    } else {
      res.status(401).json(null);
    }
    //Missing token
  } else {
    res.status(401).json(null);
  }
}
