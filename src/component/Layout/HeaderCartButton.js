import {useContext, useEffect, useState} from "react";

import CartIcon from "../Cart/CartIcon";
import CartContext from "../store/cart-context";

import styles from './HeaderCartButton.module.css';

const HeaderCartButton = props => {
    const [btnHasAnimation, setBtnHasAnimation] = useState(false);

    const cartCtx = useContext(CartContext);
    const {items} = cartCtx;

    useEffect(() => {
        if(items.length === 0) {
            return;
        }
        setBtnHasAnimation(true);
        const timer = setTimeout(()=> {
            setBtnHasAnimation(false);
        }, 300);
        return () => {
            clearTimeout(timer)
        };
    }, [items]);


    const numberOfItems = items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    const btnClasses = `${styles.button} ${btnHasAnimation ? styles.bump : ''}`

    return (
        <button className={btnClasses} onClick={props.onShowCart}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>{numberOfItems}</span>
        </button>
    );
};

export default HeaderCartButton;