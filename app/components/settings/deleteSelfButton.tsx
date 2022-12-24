"use client";

import { getCookie, deleteCookie } from "cookies-next";
import { AiOutlineUserDelete } from "react-icons/ai";
import Dialog from "../ui/dialog";
import type { User } from "../../../types/auth";

async function deleteCallback() {
  const token = getCookie("next-auth.session-token");
  if (token) {
    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/user/me?token=" +
        token +
        "&api_key=" +
        process.env.NEXT_PUBLIC_API_KEY,
      {
        method: "DELETE",
      }
    );
    deleteCookie("next-auth.session-token");
  }
}

export default function DeleteSelfButton({ user }: { user: User }) {
  return (
    <Dialog
      text="Delete Account"
      agreeText="Delete"
      disagreeText="Disagree"
      dialogContent="Please delete your account only if you really don't plan to come back. Your data will be deleted completely and irrevocably!."
      variant="outlined"
      ariaLabel="Delete Account"
      classes="border-red-600 hover:bg-red-600 hover:border-red-600 text-red-600 hover:text-white"
      dialogTitle="Delete your Account?"
      startIcon={<AiOutlineUserDelete />}
      agreeCallback={deleteCallback}
    />
  );
}
