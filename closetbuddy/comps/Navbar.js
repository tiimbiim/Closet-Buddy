import React from 'react'
import styles from '@/app/page.module.css'
import SignInOutButton from './SignInOutButton';

export default function Navbar() {


  return (
        <div>
            <h1 className={styles.header}>CLOSETBUDDY</h1>
            <div className={styles.signin}>
                <SignInOutButton />
            </div>
            <div className={styles.btnbox}>
                <a href='/'>
                    <button>Home</button>
                </a>
                <a href='wardrobe'>
                    <button>Wardrobe</button>
                </a>
                <a href='scrollStyle'>
                    <button>{`Scroll n' Style`}</button>
                </a>
                <a href='savedOutfits'>
                    <button>Saved Outfits</button>
                </a>
                <a href='aiPage'>
                    <button><i class='fa fa-star'></i> Save with AI</button>
                </a>
            </div>
        </div>
    );
}
