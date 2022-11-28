import styles from "./page.module.css";
import Login from "./components/authentification/login";
import getUser from "./components/authentification/getUser";

getUser();

export default async function Home() {
  const user = await getUser();

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
      </main>
    </div>
  );
}
