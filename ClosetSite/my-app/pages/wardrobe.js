import styles from "@/styles/Wardrobe.module.css"
import Navbar from "@/comps/navbar";


const wardrobe = () => {
    return (
        <>
            <Navbar/>
            <div className = {styles.carousel}>
                <div class = 'carousel__item'>Content#1</div>
                <div class = 'carousel__item'>Content#2</div>
                <div class = 'carousel__item'>Content#3</div>
                <div class = 'carousel__nav'>
                    <span class='carousel__button'></span>
                    <span class='carousel__button'></span>
                    <span class='carousel__button'></span>
                </div>
            </div>
        </>
    )
}

export default wardrobe;