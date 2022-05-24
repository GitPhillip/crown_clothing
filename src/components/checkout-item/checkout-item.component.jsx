import { useContext, useState, useEffect } from 'react';

import { CartContext } from '../../contexts/cart.context';
import Button from '../button/button.component';

import './checkout-item.styles.scss';

const CheckoutItem = ( {cartItem} ) =>{

    const {addItemToCart} = useContext(CartContext);//get the global state reducer
    const [totalPrice, setTotalPrice] = useState(0);

    const {id, name, price, quantity, imageUrl} = cartItem; //destructure the prop

    useEffect(()=>{
        setTotalPrice(price*quantity);//set the price as per user quantities
    },)
    //function to add product to cart
    const addProductToCart = () => {
        addItemToCart(cartItem);//add the item to the cart
        
        //add the prices
        setTotalPrice(totalPrice+price);
    };

    return(
        <div className='checkout-item-container'>
            <img alt={name} src={imageUrl}/>
            <span>{name}</span>
            <div>
                <Button>-</Button>
                <span>{quantity}</span>
                <Button onClick={addProductToCart}>+</Button>
            </div>
            <span>{totalPrice}</span> 
        </div>
    )
}
export default CheckoutItem;