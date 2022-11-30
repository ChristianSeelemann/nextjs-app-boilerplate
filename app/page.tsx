import styles from "./page.module.css";
import Login from "./components/authentification/login";
import getUser from "./lib/getUser";
import getColorMode from "./lib/getColorMode";

getUser();

export default async function Home() {
  const user = await getUser();
  const colorMode = getColorMode({ user });

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NEXT 13 BOILERPLATE</h1>

        <p className={styles.description}>This Boilerplate contains:</p>

        <div className={styles.grid}>
          <p className={styles.card}>Next.js 13</p>

          <p className={styles.card}>TailwindCSS</p>

          <p className={styles.card}>Next-Auth</p>

          <p className={styles.card}>Next-API</p>
        </div>
        <Login user={user} />
        {colorMode ? (
          colorMode === "dark" ? (
            <div className="bg-red-500 dark:bg-purple-500">
              Dark Mode enabled.
            </div>
          ) : (
            <div className="bg-red-500 dark:bg-purple-500">
              Light Mode enabled.
            </div>
          )
        ) : (
          <div className="bg-red-500 dark:bg-purple-500">No Colormode set.</div>
        )}
      </main>
    </div>
  );
}
