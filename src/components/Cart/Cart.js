import { Fragment, useContext } from 'react';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../../store/cart-context';
import CheckoutForm from './CheckoutForm';
import { useState } from 'react';
import axios from 'axios';
import CustomButton from '../UI/CustomButton';

const Cart = props => {
    const [showForm, setShowForm] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isFormBeingSubmitted, setIsFormBeingSubmitted] = useState(false)

    const cartCtx = useContext(CartContext);
    const totalAmountZero = cartCtx.totalAmount < 0.001;
    const cartTotalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
        cartCtx.removeItem(id);
    }

    const cartItemAddHandler = item => {
        cartCtx.addItem({...item, amount: 1});
    }
    const cartItems = 
    <ul className={classes['cart-items']}>
        {cartCtx.items.map(item => {
        return (
            <div key={item.id}>
                <CartItem 
                id={item.id}
                name={item.name} 
                amount={item.amount}
                price={item.price}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)}
                />
            </div>
        )
    })}
    </ul>

    const submitOrderHandler = async (clientInfo) => {
        try {
        setIsFormBeingSubmitted(true);
        
        await axios.post('https://react-http-b51ad-default-rtdb.firebaseio.com/orders.json', {
          user: clientInfo,
          orderedItems: cartCtx.items
        });
        
        setIsFormBeingSubmitted(false);
        setShowForm(false);
        setIsSubmitted(true);

        } catch (error) {
            setShowForm(false);
            setIsFormBeingSubmitted(false);
            throw new Error('Something went wrong!' + error.message)
        }
        cartCtx.clearCart();
      }

    const afterSubmitMessage = (
        <div className={classes.actions}>
            <p>Your order was submitted successfully!</p>
            {!showForm && <CustomButton 
            buttonType="Negative"
            variant="contained" 
            color="secondary" 
            className='button--cancel'  
            onClick={() => props.onHandleModal(false)}>Close</CustomButton>}
        </div>
    )



    const cartContent = (
        <Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span className={classes['total-amount']}>{cartTotalAmount}</span>
            </div>
            {showForm && !totalAmountZero && <CheckoutForm hideForm={() => {setShowForm(false)}} onSubmitForm={submitOrderHandler}/>}            
            <div className={classes.actions}>
                {!showForm &&
                <CustomButton 
                buttonType="Negative"
                variant="contained" 
                color="primary" 
                onClick={() => props.onHandleModal(false)}
                >Close</CustomButton>}
                {hasItems && !showForm && 
                <CustomButton 
                buttonType="Positive"
                variant="contained" 
                color="primary" 
                onClick={() => {setShowForm(true)}}
                >Order</CustomButton>}
            </div>
        </Fragment>
    )

    const loadingSubmit = (
        <p>Submitting form...</p>
    )
    
    return (
        <Modal onClick={props.onHandleModal}>
            {!isSubmitted && !isFormBeingSubmitted && cartContent}
            {isSubmitted && afterSubmitMessage}
            {isFormBeingSubmitted && loadingSubmit}
        </Modal>
    )
}


export default Cart;