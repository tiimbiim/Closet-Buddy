import styles from "@/app/wardrobe/wardrobe.module.css"
import Navbar from "../../../comps/Navbar";
import ImageCarousel from "../../../comps/ImageCarousel";



const wardrobe = () => {
    return ( 

        <>
            <Navbar/>
            <div className={styles.hero}>
                <h1 className={styles.category}>TOPS</h1>
                <ImageCarousel />
                <h1 className={styles.category}>BOTTOMS</h1>
                <ImageCarousel />
                <h1 className={styles.category}>SHOES</h1>
                <ImageCarousel />
            </div>
        </>

     );
}
 
export default wardrobe;
