import { cookies } from "next/headers";
import { User } from "../../types/user";

export default function getColorMode({ user }: { user: User }) {
  const allCookies = cookies();
  const colormodeCookie = allCookies.get("next-colormode");

  const userData = user?.user;
  // Choose the color mode based on the user's preference
  let colorMode;

  if (!userData || !userData.colormode) {
    // If the user is not logged in, use the colormode from the cookie
    if (!colormodeCookie) {
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
