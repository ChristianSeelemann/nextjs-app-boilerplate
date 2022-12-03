"use client";

import { getCookie, setCookie } from "cookies-next";
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { Session } from "../../../types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getColorMode({ user }: { user: Session }) {
  const colorModeCookie = getCookie("next-colormode");
  const defaultColorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;

  let actualColorMode;

  // Check if user is logged in
  if (user) {
    // Check if user has a color mode set
    if (user.user?.colormode) {
      actualColorMode = user.user.colormode;
      // If not, check if there is a cookie
    } else {
      // If there is a cookie, use it
      if (colorModeCookie) {
        actualColorMode = colorModeCookie;
        // If not, use the default color mode
      } else {
        actualColorMode = defaultColorMode;
      }
    }
  } else {
    // If user is not logged in, check cookie
    if (colorModeCookie) {
      actualColorMode = colorModeCookie;
      // If cookie is not set, set default color mode
    } else {
      actualColorMode = defaultColorMode;
    }
  }
  // Return the actual color mode
  return actualColorMode;
}

async function toggleColorMode({ user }: { user: Session }) {
  const actualColor = getColorMode({ user });

  // Everytime set cookie
  setCookie("next-colormode", actualColor === "light" ? "dark" : "light");
  // If user is logged in, set user's color mode
  if (user) {
    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/user/updateSelf?token=" +
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

export default function ColorModeToggle({ user }: { user: Session }) {
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
