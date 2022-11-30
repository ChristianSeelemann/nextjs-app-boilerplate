import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import getUser from "./components/authentification/getUser";
import getColorMode from "./lib/getColorMode";

getUser();

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUser();
  const user = userData?.user;

  const colorMode = getColorMode({ user });

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
