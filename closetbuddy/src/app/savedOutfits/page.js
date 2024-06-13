import styles from '../savedOutfits/savedOutfits.module.css'
import Navbar from '../../../comps/Navbar';
import SavedOutfitBlock from '../../../comps/SavedOutfitBlock';
import { auth } from '../../../firebase.config'

const savedOutfits = () => {

    const user = auth.currentUser;

    return ( 

        <>
        <Navbar/>
        <div className={styles.hero}>
            <div className={styles.column}>
                <SavedOutfitBlock/>
            </div>
        </div>
        </>

     );
}
 
export default savedOutfits;