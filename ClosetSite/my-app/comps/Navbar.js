import styles from "@/styles/Home.module.css";

const Navbar = () => {
    return (
        <div>
            <div className={styles.btnbox}>
                <a href='wardrobe'>
                    <button>Wardrobe</button>
                </a>
                <button>Scroll n' Style</button>
                <button>Saved Outfits</button>
                <button>Save with AI</button>
            </div>
        </div>
    );
}

export default Navbar;