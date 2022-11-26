import "./globals.css";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>
        <header>
          <nav>
            <Link href="/">
              <li>Home</li>
            </Link>
            <Link href="/sandbox">
              <li>Sandbox</li>
            </Link>
          </nav>
        </header>
        {children}
        <footer>Footer</footer>
      </body>
    </html>
  );
}
