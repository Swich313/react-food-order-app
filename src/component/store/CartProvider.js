import {useReducer} from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
    let updatedTotalAmount;
    let updatedItems;
    switch (action.type) {
    case 'ADD_ITEM':
        updatedTotalAmount = state.totalAmount + action.payload.price * action.payload.amount;
        const existingCartItemIndex = state.items.findIndex(item => item.id === action.payload.id);
        const existingCartItem = state.items[existingCartItemIndex];

        if(existingCartItem) {
        const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.payload.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.payload);
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount};
        case 'REMOVE_ITEM':
         const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
         const existingItem = state.items[existingItemIndex];
         updatedTotalAmount = state.totalAmount - existingItem.price;
        if(existingItem.amount === 1) {
            updatedItems = state.items.filter(item => item.id !== action.payload);
         } else {
             const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
             updatedItems = [...state.items];
             updatedItems[existingItemIndex] = updatedItem;
        }
        return {items: updatedItems, totalAmount: updatedTotalAmount};
    default: return defaultCartState;
}
}

const CartProvider = props => {
    // const [items, totalAmount, addItem, removeItem] = props;
    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState);



    const addItemToCartHandler = item => {
        dispatchCart({type: 'ADD_ITEM', payload: item});
    };

    const removeItemFromCartHandler = id => {
        dispatchCart({type: 'REMOVE_ITEM', payload: id});
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
    }

    return <CartContext.Provider value={cartContext}>{props.children}</CartContext.Provider>
};

export default CartProvider;