import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles';

const CartIcon = () =>{

    const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext); //bring in your global state

    //function to inverse the boolean state
    const onCartClick = () =>{
        setIsCartOpen(!isCartOpen); //inverse the boolean state
    }

    return(
        <CartIconContainer onClick={onCartClick}>
            <ShoppingIcon />
            <ItemCount>{cartQuantity}</ItemCount>
        </CartIconContainer>
    );
}
export default CartIcon;