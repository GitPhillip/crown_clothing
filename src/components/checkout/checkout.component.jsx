import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../checkout-item/checkout-item.component';

import './checkout.styles.scss';

const Checkout = () =>{

    const { addItemToCart, cartItems, cartQuantity } = useContext(CartContext); //destructure the context

    return(
        <div className='checkout-container'>
        {
            cartItems.map(cartItem =>(
                <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
            ))
        }
        </div>
    )
}
export default Checkout;