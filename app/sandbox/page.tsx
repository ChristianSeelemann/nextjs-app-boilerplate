import Counter from "../components/sandbox/counter";
import Test from "../components/sandbox/test";

export default async function SandboxPage() {
  return (
    <>
      <h1 className="text-3xl font-bold">Hello!</h1>
      <Counter />
      <Test />
    </>
  );
}
