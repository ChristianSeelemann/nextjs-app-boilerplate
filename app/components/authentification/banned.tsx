"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import Button from "../ui/button";

import type { User } from "../../../types/auth";

export default function Banned({ user }: { user: User }) {
  // Check if user is banned
  if (user && user.banned) {
    // Get Banned Until Date
    let timeUntil;
    if (user.bannedUntil) {
      const toDate = new Date(user.bannedUntil * 1000);
      const month = toDate.getMonth() + 1;
      const day = toDate.getDate();
      const year = toDate.getFullYear();
      const hours = toDate.getHours();
      const minutes = "0" + toDate.getMinutes();
      timeUntil =
        day +
        "." +
        month +
        "." +
        year +
        " - " +
        hours +
        ":" +
        minutes.substr(-2);
    }

    return (
      <section className="p-12 grid justify-items-center">
        <h1 className="text-3xl font-bold">Your are banned!</h1>
        {user.bannedReason && <p>Reason: {user.bannedReason}</p>}
        {user.bannedUntil && <p>Until: {timeUntil}</p>}
        <Button
          text="Logout"
          variant="outlined"
          ariaLabel="Logout"
          startIcon={<FiLogOut />}
          onClick={() => signOut()}
          classes="!mt-12 defaultbutton"
        />
      </section>
    );
  }

  // Return null if user is not banned
  return null;
}
