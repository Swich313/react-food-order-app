import {useRef, useState} from "react";

import Input from "../../UI/Input/Input";

import styles from './MealItemForm.module.css';

const MealItemForm = props => {
    const [amountIsValid, setAmountIsValid] = useState(true);

    const submitHandler = e => {
        e.preventDefault();
        const enteredAmount = amountInputRef.current.value;
        if(enteredAmount.trim().length === 0 ||
        +enteredAmount < 1 || +enteredAmount > 10){
            setAmountIsValid(false);
            return;
        }
        props.onAddToCart(+enteredAmount);
    };

    const amountInputRef = useRef();

    return (
        <form className={styles.form} onSubmit={submitHandler}>
            <Input
                ref={amountInputRef}
                label="Amount" input={{
                id: 'amount_' + props.id,
                type: 'number',
                min: '1',
                max: '10',
                step: '1',
                defaultValue: '1',
            }   }/>
            <button>+ Add</button>
            {!amountIsValid && <p>Please enter a valid amount (1-10)</p>}
        </form>
    );
};

export default MealItemForm;