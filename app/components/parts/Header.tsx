import Link from "next/link";
import Login from "../authentification/login";

import getUser from "../../lib/getUser";
import ColorModeToggle from "../colormode/colorModeToggle";

getUser();

export default async function Header() {
  const user = await getUser();

  return (
    <header className="flex justify-between">
      <nav>
        <Link href="/">
          <li>Home</li>
        </Link>
        <Link href="/sandbox">
          <li>Sandbox</li>
        </Link>
      </nav>
      <div className="flex">
        <ColorModeToggle user={user} />
        <Login user={user} />
      </div>
    </header>
  );
}
