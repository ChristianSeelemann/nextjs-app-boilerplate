"use client";

import { getCookie, setCookie } from "cookies-next";
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { User } from "../../../types/user";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getColorMode({ user }: { user: User }) {
  const colorModeCookie = getCookie("next-colormode");
  const defaultColorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;

  let actualColorMode;
  // Check if user is logged in
  if (!user) {
    // No? Check if cookie is set
    if (!colorModeCookie) {
      actualColorMode = defaultColorMode;
    } else {
      actualColorMode = colorModeCookie;
    }
  } else {
    // Yes? Check if user has a color mode set
    if (!user.user.colormode) {
      // No? Check if cookie is set
      if (!colorModeCookie) {
        actualColorMode = defaultColorMode;
      } else {
        actualColorMode = colorModeCookie;
      }
      // Yes? Set actualColorMode to user's color mode
    } else {
      actualColorMode = user.user.colormode;
    }
  }
  return actualColorMode;
}

async function toggleColorMode({ user }: { user: User }) {
  const actualColor = getColorMode({ user });

  // Everytime set cookie
  setCookie("next-colormode", actualColor === "light" ? "dark" : "light");
  // If user is logged in, set user's color mode
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
          colormode: actualColor === "light" ? "dark" : "light",
        }),
      }
    );
  }
}

export default function ColorModeToggle({ user }: { user: User }) {
  const router = useRouter();
  const [colorMode, setColorMode] = useState<any>();

  // Set color mode on load to avoid hydration mismatch
  useEffect(() => {
    setColorMode(getColorMode({ user }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          toggleColorMode({ user });
          setColorMode(colorMode === "dark" ? "light" : "dark");
          router.refresh();
        }}
      >
        {colorMode ? colorMode === "dark" ? <HiSun /> : <MdDarkMode /> : null}
      </button>
    </div>
  );
}
