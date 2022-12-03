import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";
import getUser from "./lib/getUser";
import getColorMode from "./lib/getColorMode";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const userData = await getUser();

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
