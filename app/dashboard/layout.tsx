import { redirect } from "next/navigation";
import DashboardNavigation from "../components/dashboard/navigation";
import getUser from "../lib/getUser";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Get user data
  const userData = await getUser();

  if (!userData) {
    redirect("/");
  }

  return (
    <div className="flex gap-8 w-full">
      <DashboardNavigation user={userData.user} />
      <article className="grow">{children}</article>
    </div>
  );
}
