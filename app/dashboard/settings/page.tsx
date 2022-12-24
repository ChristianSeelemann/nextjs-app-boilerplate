import DeleteSelfButton from "../../components/settings/deleteSelfButton";
import Alert from "../../components/ui/alert";
import getUser from "../../lib/getUser";

export default async function SettingsPage() {
  const userData = await getUser();

  if (!userData) {
    return <Alert text="You are not logged in!" type="error" />;
  }

  return (
    <>
      <section className="pagetitle">
        <h1>Settings!</h1>
        <p>This is the settings page.</p>
      </section>
      <section className="pagesection">
        <h2>Delete your Account</h2>
        <Alert type="error" text="Caution! This can´t be undone!" />
        <p className="pt-4 pb-6">
          Please delete your account only if you really don&apos;t plan to come
          back. Your data will be deleted completely and irrevocably! It was
          nice having you here. See you around.
        </p>
        <DeleteSelfButton user={userData.user} />
      </section>
    </>
  );
}
