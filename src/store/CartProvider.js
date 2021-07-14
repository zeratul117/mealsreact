import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
}

const cartReducer = (state, action) => {
    if(action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.item.id);
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if(existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            updatedItems = [...state.items];
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        }

    } else if (action.type === 'REMOVE') {
        let updateItems = [...state.items]

        const existingCartItemIndex = state.items.findIndex(item => item.id === action.itemId);
        const existingCartItem = state.items[existingCartItemIndex];
        const updateTotalAmount = state.totalAmount - existingCartItem.price;

        if(existingCartItem) {
            if(existingCartItem.amount > 1) {
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount - 1
                }
                updateItems[existingCartItemIndex] = updatedItem;
            } else {
                updateItems = state.items.filter(item => item.id !== action.itemId);
            }
        }
        return {
            items: updateItems,
            totalAmount: updateTotalAmount > 0 ? updateTotalAmount : 0
        };
        
    } else if (action.type === 'CLEAR') {
        return defaultCartState;
    }
    

    return defaultCartState;
}

const CartProvider = (props) => {

    const [cartState, dispatchCart] = useReducer(cartReducer, defaultCartState)

    const addItemToCartHandler = item => {
        dispatchCart({type: 'ADD', item: item})
    }
    
    const removeItemFromCartHandler = itemId => {
        dispatchCart({type: 'REMOVE', itemId: itemId})
    }

    const clearCartHandler = () => {
        dispatchCart({ type: 'CLEAR'})
    }

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler,
        clearCart: clearCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {props.children}
        </CartContext.Provider>
    )
}

export default CartProvider;