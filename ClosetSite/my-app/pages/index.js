import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Navbar from "@/comps/Navbar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Navbar/>
      <h1 className={styles.title}>Welcome to ClosetBuddy!</h1>
      <p className={styles.description}>Your on the go closet, where you can plan outfits and keep track of clothes</p>
    </>
  );
}
