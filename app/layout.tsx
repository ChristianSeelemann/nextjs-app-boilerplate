import { cookies } from "next/headers";
import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import getUser from "./components/authentification/getUser";

getUser();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUser();
  const user = userData?.user;

  const allCookies = cookies();
  const colormodeCookie = allCookies.get("next-colormode");

  // Choose the color mode based on the user's preference
  let colorMode;

  if (!user || !user.colormode) {
    // If the user is not logged in, use the colormode from the cookie
    if (!colormodeCookie) {
      colorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;
    } else {
      colorMode = colormodeCookie.value;
    }
    // If the user is logged in, use the colormode from the database
  } else if (user && user.colormode) {
    colorMode = user.colormode;
    // User not logged in and no cookie set
  } else {
    colorMode = process.env.NEXT_PUBLIC_DEFAULT_COLORMODE;
  }

  return (
    <html lang="en" className={colorMode}>
      <head />
      <body>
        {/* @ts-expect-error Server Component */}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
