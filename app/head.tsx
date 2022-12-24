export default async function Head() {
  return (
    <>
      <title>{process.env.NEXT_PUBLIC_SITENAME}</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Boilerplate using Next.js 13" />
      <link rel="icon" href="/favicon.ico" />
    </>
  );
}
