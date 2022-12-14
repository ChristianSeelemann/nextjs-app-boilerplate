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
      <body className="bg-light-100 dark:bg-dark-900 text-light-900 dark:text-dark-100 overflow-hidden">
        {/* @ts-expect-error Server Component */}
        <Header />
        <div className="wrapper mt-16 mr-1 px-8 overflow-y-scroll scroll">
          <main className="pt-4 pb-12">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
