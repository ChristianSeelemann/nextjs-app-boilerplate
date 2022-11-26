import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>NEXT 13 BOILERPLATE</h1>

        <p className={styles.description}>This Boilerplate contains:</p>

        <div className={styles.grid}>
          <p className={styles.card}>Next.js 13</p>

          <p className={styles.card}>TailwindCSS</p>

          <p className={styles.card}>Next.js 13</p>
        </div>
      </main>
    </div>
  );
}
