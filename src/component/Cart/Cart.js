import {useContext} from "react";

import Modal from '../UI/Modal/Modal';
import CartItem from "./CartItem";
import CartContext from "../store/cart-context";

import styles from './Cart.module.css';

const Cart = props => {
    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
        console.log(id)
    };

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    };

    const cartItems = <ul className={styles['cart-items']}>{
        cartCtx.items.map(item => {
            return <CartItem key={item.id}
                             name={item.name}
                             amount={item.amount}
                             price={item.price}
                             onAdd={cartItemAddHandler.bind(null, item)}
                             onRemove={cartItemRemoveHandler.bind(null, item.id)}/>
        })}</ul>;
    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;