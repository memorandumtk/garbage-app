import Image from "next/image";
import { headers } from "next/headers";
import Button from "./components/button";
// import MapPage from "./components/map-page";
import Map from "./components/map-page";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Map />
      {/* <MapPage /> */}
      <Button />
    </main>
  );
}
