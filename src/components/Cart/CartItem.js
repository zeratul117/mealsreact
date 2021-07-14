import classes from './CartItem.module.css';
import CustomButton from '../UI/CustomButton';

const CartItem = (props) => {
  const price = `$${props.price.toFixed(2)}`;
  return (
    <li className={classes['cart-item']}>
      <div>
        <h2>{props.name}</h2>
        <div className={classes.summary}>
          <span className={classes.price}>{price}</span>
          <span className={classes.amount}>x {props.amount}</span>
        </div>
      </div>
      <div className={classes.actions}>
        <CustomButton 
        buttonType="Negative" 
        variant="outlined" 
        color="secondary" 
        onClick={props.onRemove}>−</CustomButton>
        <CustomButton 
        buttonType="Positive" 
        variant="outlined" 
        color="secondary"onClick={props.onAdd}>+</CustomButton>
      </div>
    </li>
  );
};

export default CartItem;
