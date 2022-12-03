import { cookies } from "next/headers";
import { Session } from "../../types/auth";

export default function getColorMode({ user }: { user: Session }) {
  const allCookies = cookies();
  const colormodeCookie = allCookies.get("next-colormode");

  const userData = user?.user;
  // Choose the color mode based on the user's preference
  let colorMode;

  if (!userData || !userData.colormode) {
    // If the user is not logged in or don´t had a colormode, use the colormode from the cookie
    if (!colormodeCookie) {
      // If the cookie is not set, use the default color mode
      colorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;
    } else {
      colorMode = colormodeCookie.value;
    }
    // If the user is logged in, use the colormode from the database
  } else if (userData && userData.colormode) {
    colorMode = userData.colormode;
    // User not logged in and no cookie set
  } else {
    colorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;
  }
  return colorMode;
}
