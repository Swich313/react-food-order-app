import {useState} from "react";

import Header from './component/Layout/Header';
import Meals from './component/Meals/Meals/Meals';
import Cart from "./component/Cart/Cart";
import CartProvider from "./component/store/CartProvider";

function App() {
    const [cartIsShown, setCartIsShown] = useState(false);

    const showCartHandler = () => {
        setCartIsShown(true);
    };

    const hideCartHandler = () => {
        setCartIsShown(false);
    };

  return (
    <CartProvider>
      {cartIsShown && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler}/>
        <main>
            <Meals />
        </main>
    </CartProvider>
  );
}

export default App;
