import Link from "next/link";
import Login from "../authentification/login";

import getUser from "../authentification/getUser";

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
      <div>
        <Login user={user} />
      </div>
    </header>
  );
}
