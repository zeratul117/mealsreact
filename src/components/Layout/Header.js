import React, { useContext } from 'react';
import CartContext from '../../store/cart-context';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css'
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    const cartCtx = useContext(CartContext);
    return (
        <React.Fragment>
            <header className={classes.header}>
                <h1>React Meals iCommerce</h1>
                <HeaderCartButton onClick={() => props.onHandleModal(cartCtx.totalAmount)}/>
            </header>
            <div className={classes['main-image']}>
                <img src={mealsImage} alt="A table full of food" />
            </div>
        </React.Fragment>
    )
}

export default Header;