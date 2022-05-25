import { useContext } from 'react';
import { useNavigate } from "react-router-dom";

import { CartContext } from '../../contexts/cart.context';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import {CartDropdownContainer,CartItems, EmptyMessage} from './cart-dropdown.styles.jsx';

const CartDropdown = () =>{

    const { cartItems } = useContext(CartContext);//get your persisting state

    //useNavigate is a hook that allows us to get a navigateFunction
    const navigate = useNavigate();

    const checkoutHandler = ( ) =>{
        navigate('/checkout');
    } 

    return(
        <CartDropdownContainer>
            <CartItems>
            {
                cartItems.length ? (cartItems.map(item => (
                    <CartItem key={item.id} cartItem={item} />
                )))
                :
                <EmptyMessage>No items in your cart</EmptyMessage>
            }
            </CartItems>
            <Button onClick={checkoutHandler}>Checkout</Button>
        </CartDropdownContainer>
    )
}
export default CartDropdown;