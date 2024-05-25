import { Inter } from "next/font/google";
import Navbar from "@/comps/navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar/>
    </>
  );
}
