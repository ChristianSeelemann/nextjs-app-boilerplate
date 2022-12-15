"use client";

import { getCookie, setCookie } from "cookies-next";
import { MdDarkMode } from "react-icons/md";
import { HiSun } from "react-icons/hi";
import { Session } from "../../../types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonGroup, MenuItem } from "@mui/material";
import Button from "../ui/button";

export default function ColorModeToggle({ session }: { session: Session }) {
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
        <MenuItem className="menuitem hover:!bg-transparent !py-0">
          <ButtonGroup
            variant="contained"
            aria-label="Change Color Mode"
            className="mt-2 mb-1"
          >
            <Button
              text="Light"
              variant="outlined"
              startIcon={<HiSun className="dark:text-yellow-500" />}
              ariaLabel="Choose Light Mode"
              disabled={colorMode === "light" ? true : false}
              classes={
                colorMode === "light"
                  ? "defaultbutton font-chakrabold !bg-light-200 !border-light-800"
                  : "defaultbutton font-chakrabold !border-dark-100 hover:!bg-dark-600 hover:!text-dark-50"
              }
              onClick={() => {
                toggleColorMode({ session });
                setColorMode("light");
                setTimeout(() => {
                  router.refresh();
                }, 250);
              }}
            />
            <Button
              text="Dark"
              variant="outlined"
              startIcon={
                <MdDarkMode className="text-light-900 dark:text-dark-300" />
              }
              ariaLabel="Choose Dark Mode"
              disabled={colorMode === "dark" ? true : false}
              classes={
                colorMode === "dark"
                  ? "defaultbutton font-chakrabold !text-dark-300 !bg-dark-700"
                  : "defaultbutton font-chakrabold !bg-transparent !text-light-800 !border-light-800 hover:!bg-light-300"
              }
              onClick={() => {
                toggleColorMode({ session });
                setColorMode("dark");
                setTimeout(() => {
                  router.refresh();
                }, 250);
              }}
            />
          </ButtonGroup>
        </MenuItem>
      )}
    </>
  );
}
