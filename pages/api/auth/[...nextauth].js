import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import dbConnection from "../../../app/lib/dbConnectionAuth.js";

export const authOptions = {
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(dbConnection),
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: false,
        sameSite: "lax",
        secure: false,
        path: "/",
      },
    },
  },
};

export default NextAuth(authOptions);
