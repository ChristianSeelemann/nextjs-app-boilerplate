import Link from "next/link";
import Login from "../authentification/login";

import getUser from "../../lib/getUser";
import ColorModeToggle from "../colormode/colorModeToggle";

getUser();

export default async function Header() {
  const userData = await getUser();

  return (
    <header className="flex justify-between items-center px-8 bg-light-100 dark:bg-dark-900 text-light-900 dark:text-dark-100 h-16 fixed top-0 left-0 w-screen">
      <nav className="font-bodysemibold">
        <ul className="flex gap-4">
          <Link href="/">
            <li>Home</li>
          </Link>
          <Link href="/sandbox">
            <li>Sandbox</li>
          </Link>
        </ul>
      </nav>
      <div className="flex gap-4">
        <Login session={userData} />
      </div>
    </header>
  );
}
