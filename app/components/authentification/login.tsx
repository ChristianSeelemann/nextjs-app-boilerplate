"use client";

import { setCookie } from "cookies-next";
import { Session } from "../../../types/auth";
import { signIn, signOut } from "next-auth/react";
import { Button } from "@mui/material";
import { FiLogOut } from "react-icons/fi";
import { BsDiscord } from "react-icons/bs";
import Avatar from "../user/avatar";

export default function Login({ session }: { session: Session }) {
  if (session) {
    setCookie("next-auth.session-token", session.token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  return (
    <>
      {session ? (
        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<FiLogOut />}
            onClick={() => signOut()}
            sx={{
              color: "white",
              paddingTop: "7px",
              borderColor: "white",
              "& .MuiButton-startIcon": {
                marginTop: "-3px",
              },
            }}
          >
            Logout
          </Button>

          <Avatar session={session} />
        </div>
      ) : (
        <div className="flex gap-3">
          <Button
            variant="outlined"
            aria-label="Login"
            color="primary"
            startIcon={<BsDiscord />}
            onClick={() => signIn("discord")}
            sx={{
              color: "white",
              paddingTop: "7px",
              borderColor: "white",
              "& .MuiButton-startIcon": {
                marginTop: "-3px",
              },
            }}
          >
            Login with Discord
          </Button>
        </div>
      )}
    </>
  );
}
