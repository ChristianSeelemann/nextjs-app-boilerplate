import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import getUser from "./lib/getUser";
import getColorMode from "./lib/getColorMode";

// Fonts for Material UI
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import lastOnline from "./lib/lastOnline";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data
  const userData = await getUser();
  // Set lastOnline to User
  lastOnline();
  // Get color mode
  const colorMode = getColorMode(userData);

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
