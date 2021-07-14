import React, { useContext, useEffect, useState } from 'react';
import CartContext from '../../store/cart-context';
import CartIcon from '../Cart/CartIcon'
import classes from './HeaderCartButton.module.css';


const HeaderCartButton = props => {
  const cartCtx = useContext(CartContext);
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const { items } = cartCtx;

  const numberOfItems = items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0)

  const btnClasess = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`

  useEffect(() => {
    if(items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    }
  }, [items])

  return (
      <button className={btnClasess} onClick={props.onClick}>
        <span className={classes.icon}> 
          <CartIcon />
        </span>
        <span>Your Cart</span>
        <span className={classes.badge}>{numberOfItems}</span>
      </button>
  );
}

export default HeaderCartButton;
