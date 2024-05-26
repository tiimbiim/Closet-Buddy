import styles from "@/styles/Home.module.css";

const Navbar = () => {
    return (
        <div>
            <h1 className={styles.header}>CLOSETBUDDY</h1>
            <div className={styles.btnbox}>
                <a href='/'>
                    <button>Home</button>
                </a>
                <a href='wardrobe'>
                    <button>Wardrobe</button>
                </a>
                <a href='scrollStyle'>
                    <button>Scroll n' Style</button>
                </a>
                <a href='saved_outfits'>
                    <button>Saved Outfits</button>
                </a>
                <a href='ai_page'>
                    <button><i class='fa fa-star'></i> Save with AI</button>
                </a>
            </div>
        </div>
    );
}

export default Navbar;