import "./globals.css";
import Header from "./components/parts/Header";
import Footer from "./components/parts/Footer";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
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
