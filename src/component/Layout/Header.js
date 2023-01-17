import HeaderCartButton from "../Layout/HeaderCartButton";

import styles from './Header.module.css';
import mealsImage from '../../assets/img.png';

const Header = props => {
    return (
        <>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onShowCart={props.onShowCart}/>
            </header>
            <div className={styles['main-image']}>
                <img src={mealsImage} alt="A table full of food"/>
            </div>  
        </>
    );
};

export default Header;