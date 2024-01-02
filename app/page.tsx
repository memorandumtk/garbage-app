import Image from "next/image";
import { headers } from "next/headers";
import LocationButton from "./components/buttons/locationButton";
import MapPage from "./components/map-page";
// import Map from "./components/map-page";
import ButtonSection from "./components/buttonSection";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { NavBar } from "./components/nav/nav-bar";

export default function Home() {
  return (
    <div>
      <NavBar />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <MapPage />
        <ButtonSection />
      </main>
    </div>
  );
}
