"use client";

import { signIn, signOut } from "next-auth/react";
import { setCookie } from "cookies-next";
import { User } from "../../../types/auth";

export default function Login({ user }: { user: User }) {
  let data;
  let userData;

  // If user is not logged in, set data to null.
  if (!user) {
    data = null;
    userData = null;
    // If user is logged in, renew the session, and set data.
  } else {
    data = user;
    userData = data.user;
    setCookie("next-auth.session-token", data.token, {
      path: "/",
      maxAge: 30 * 24 * 60 * 60,
    });
  }

  return (
    <>
      {!userData ? (
        <button onClick={() => signIn("discord")}>Login with Discord</button>
      ) : (
        "Logged in as " + userData.name
      )}
      {userData && userData.banned && <p>You are banned from this website.</p>}
      {user && <button onClick={() => signOut()}>Logout</button>}
    </>
  );
}
