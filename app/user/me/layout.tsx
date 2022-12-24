import { redirect } from "next/navigation";
import getUser from "../../lib/getUser";

export default async function UserMeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data
  const userData = await getUser();

  if (!userData) {
    redirect("/user");
  }

  return <article className="grow">{children}</article>;
}
