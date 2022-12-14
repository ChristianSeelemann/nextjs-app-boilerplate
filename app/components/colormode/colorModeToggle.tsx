"use client";

import { getCookie, setCookie } from "cookies-next";
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { Session } from "../../../types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IconButton } from "@mui/material";
import Tooltip from "../ui/tooltip";

function getColorMode({ session }: { session: Session }) {
  const colorModeCookie = getCookie("next-colormode");
  const defaultColorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;

  let actualColorMode;

  // Check if user is logged in
  if (session) {
    // Check if user has a color mode set
    if (session.user?.colormode) {
      actualColorMode = session.user.colormode;
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

async function toggleColorMode({ session }: { session: Session }) {
  const actualColor = getColorMode({ session });

  // Everytime set cookie
  setCookie("next-colormode", actualColor === "light" ? "dark" : "light");
  // If user is logged in, set user's color mode
  if (session) {
    await fetch(
      process.env.NEXT_PUBLIC_BASE_URL +
        "/api/user/updateSelf?token=" +
        session.token +
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

export default function ColorModeToggle({ session }: { session: Session }) {
  const router = useRouter();
  const [colorMode, setColorMode] = useState<any>();

  // Set color mode on load to avoid hydration mismatch
  useEffect(() => {
    setColorMode(getColorMode({ session }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {colorMode && (
        <Tooltip
          title={colorMode === "light" ? "Set Dark Mode" : "Set Light Mode"}
        >
          <IconButton
            className={
              colorMode === "dark"
                ? "bg-dark-800 rounded-md hover:bg-dark-700"
                : "bg-light-200 rounded-md hover:bg-light-300"
            }
            aria-label="Change Colormode"
            color="inherit"
            sx={{
              "&.MuiIconButton-root.Mui-focusVisible": {
                borderRadius: "8px",
              },
            }}
            onClick={() => {
              toggleColorMode({ session });
              setColorMode(colorMode === "dark" ? "light" : "dark");
              setTimeout(() => {
                router.refresh();
              }, 250);
            }}
          >
            {colorMode === "dark" ? (
              <HiSun className="text-yellow-500" />
            ) : (
              <MdDarkMode className="text-light-900" />
            )}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
}
