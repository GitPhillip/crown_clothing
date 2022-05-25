import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';

import CheckoutItem from '../../components/checkout-item/checkout-item.component';

import { CheckoutContainer, CheckoutHeader, Total}  from './checkout.styles';

const Checkout = () =>{

    const { cartItems } = useContext(CartContext); //destructure the context
    const [totalPrice, setTotalPrice] = useState(0);

    //rehydration
    useEffect(()=>{
        const totalPrices = cartItems.reduce((total,cartItem)=>{
            return cartItem.totalPrice ? total+=cartItem.totalPrice : total+=cartItem.price;
        },0);
        setTotalPrice(totalPrices);
    },[cartItems,totalPrice]);

    return(
        <CheckoutContainer>
            <CheckoutHeader>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </CheckoutHeader>
            {
                cartItems.map(cartItem =>(
                    <CheckoutItem key={cartItem.id} cartItem={cartItem}/>
                ))
            }
            <Total>Total: R{totalPrice}</Total>
        </CheckoutContainer>
    )
}
export default Checkout;