import Link from "next/link";
import Login from "../authentification/login";

import getUser from "../../lib/getUser";
import ColorModeToggle from "../colormode/colorModeToggle";

getUser();

export default async function Header() {
  const userData = await getUser();

  return (
    <header className="flex justify-between items-center px-8 py-3 bg-blue-300/10">
      <nav>
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
        <ColorModeToggle session={userData} />
        <Login session={userData} />
      </div>
    </header>
  );
}
