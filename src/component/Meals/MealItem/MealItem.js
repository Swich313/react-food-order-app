import {useContext} from "react";
import MealItemForm from './MealItemForm';

import styles from './MealItem.module.css'
import CartContext from "../../store/cart-context";

const MealItem = props => {
    const cartCtx = useContext(CartContext);

    const {id, name, description, price} = props;
    const formattedPrice = `$${price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({id, name, amount, price})
    };

    return (
        <li className={styles.meal}>
            <div>
                <h3>{name}</h3>
                <div className={styles.description}>{description}</div>
                <div className={styles.price}>{formattedPrice}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={id}/>
            </div>
        </li>
    );
};

export default MealItem;