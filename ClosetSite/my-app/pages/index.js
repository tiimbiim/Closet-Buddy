import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>ClosetSite</title>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel ="stylesheet" href = 'Home.module.css'/>
      </Head>
      
      <body className={styles.body}>
        <div className = {styles.hero}>
          <div className={styles.btnbox}>
            <button>Scroll n' Style</button>
            <button>Saved Outfits</button>
            <button>Wardrobe</button>
            <button>Save with AI</button>
          </div>
        </div>
      </body>
    </>
  );
}
