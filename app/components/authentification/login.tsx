"use client";

import { setCookie } from "cookies-next";
import { Session } from "../../../types/auth";
import { signIn, signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { BsDiscord } from "react-icons/bs";
import InteractiveAvatar from "../user/avatarWithMenu";
import Button from "../ui/button";

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
            ariaLabel="Logout Button"
            text="Logout"
            classes="defaultbutton"
          />

          <InteractiveAvatar session={session} />
        </div>
      ) : (
        <div className="flex gap-3">
          <Button
            variant="outlined"
            startIcon={<BsDiscord />}
            onClick={() => signIn("discord")}
            ariaLabel="Login with Discord Button"
            text="Login with Discord"
            classes="defaultbutton"
          />
        </div>
      )}
    </>
  );
}
