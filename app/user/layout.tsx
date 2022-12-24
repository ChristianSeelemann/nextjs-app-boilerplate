import getUser from "../lib/getUser";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data
  const userData = await getUser();

  return <article className="grow">{children}</article>;
}
