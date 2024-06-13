import styles from "@/app/wardrobe/wardrobe.module.css"
import Navbar from "../../../comps/Navbar";
import ImageCarouselWardrobe from "../../../comps/ImageCarouselWardrobe";



const wardrobe = () => {
    return ( 

        <>
            <Navbar/>
            <div className={styles.hero}>
                <div className={styles.column}>
                    <h1 className={styles.category}>TOPS</h1>
                    <ImageCarouselWardrobe category="tops" />
                </div>
                <div className={styles.column}>
                    <h1 className={styles.category}>BOTTOMS</h1>
                    <ImageCarouselWardrobe category="bottoms" />
                </div>
                <div className={styles.column}>
                    <h1 className={styles.category}>SHOES</h1>
                    <ImageCarouselWardrobe category="shoes" />
                </div>
            </div>
        </>

     );
}
 
export default wardrobe;
