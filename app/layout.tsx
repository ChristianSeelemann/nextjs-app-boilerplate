import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import getUser from "./lib/getUser";
import getColorMode from "./lib/getColorMode";
import Banned from "./components/authentification/banned";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data
  const userData = await getUser();

  // Get color mode
  const colorMode = getColorMode(userData);
  console.log(colorMode);

  return (
    <html lang="en" data-mui-color-scheme={colorMode}>
      <head />
      <body className={"mode-" + colorMode}>
        {userData && userData.user.banned ? (
          <Banned user={userData.user} />
        ) : (
          <>
            {/* @ts-expect-error Server Component */}
            <Header />
            <div className="wrapper mt-16 mr-1 px-8 overflow-y-scroll scroll">
              <main className="py-12">{children}</main>
              <Footer />
            </div>
          </>
        )}
      </body>
    </html>
  );
}
