import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

const CartIcon = () =>{

    const { isCartOpen, setIsCartOpen, cartQuantity } = useContext(CartContext); //bring in your global state

    //function to inverse the boolean state
    const onCartClick = () =>{
        setIsCartOpen(!isCartOpen); //inverse the boolean state
    }

    return(
        <div className='cart-icon-container' onClick={onCartClick}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{cartQuantity}</span>
        </div>
    );
}
export default CartIcon;