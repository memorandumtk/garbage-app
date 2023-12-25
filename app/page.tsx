import Image from "next/image";
import { headers } from "next/headers";
import Button from "./components/button";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Button />
    </main>
  );
}
