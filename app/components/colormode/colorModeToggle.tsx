"use client";

import { getCookie, setCookie } from "cookies-next";
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { User } from "../../../types/user";
import { useRouter } from "next/navigation";

function getColorMode({ user }: { user: User }) {
  const colorModeCookie = getCookie("next-colormode");
  const defaultColorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;

  let actualColorMode;
  if (!user) {
    if (!colorModeCookie) {
      actualColorMode = defaultColorMode;
    } else {
      actualColorMode = colorModeCookie;
    }
  } else {
    if (!user.user.colormode) {
      actualColorMode = defaultColorMode;
    } else {
      actualColorMode = user.user.colormode;
    }
  }
  return actualColorMode;
}

async function toggleColorMode({ user }: { user: User }) {
  const actualColor = getColorMode({ user });

  if (actualColor === "dark") {
    setCookie("next-colormode", "light");
    if (user) {
      await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/user/update?token=" +
          user.token +
          "&api_key=" +
          process.env.NEXT_PUBLIC_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colormode: "light",
          }),
        }
      );
    }
  } else {
    setCookie("next-colormode", "dark");
    if (user) {
      await fetch(
        process.env.NEXT_PUBLIC_BASE_URL +
          "/api/user/update?token=" +
          user.token +
          "&api_key=" +
          process.env.NEXT_PUBLIC_API_KEY,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            colormode: "dark",
          }),
        }
      );
    }
  }
}

export default function ColorModeToggle({ user }: { user: User }) {
  const router = useRouter();

  return (
    <div>
      <button
        onClick={() => {
          toggleColorMode({ user });
          router.refresh();
        }}
      >
        {getColorMode({ user }) === "dark" ? <HiSun /> : <MdDarkMode />}
      </button>
    </div>
  );
}
