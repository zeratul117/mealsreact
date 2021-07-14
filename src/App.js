import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Meals from './components/Meals/Meals';
import Cart from './components/Cart/Cart'
import CartProvider from './store/CartProvider';

const App = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartStateHandler = totalAmount => {
    if(totalAmount < 0.001) {
      setIsCartOpen(false);
    } else {
      setIsCartOpen(true);
    }
  }

  return (
    <CartProvider>
      {isCartOpen && <Cart onHandleModal={cartStateHandler} />}
      <Header onHandleModal={cartStateHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  );
}

export default App;
