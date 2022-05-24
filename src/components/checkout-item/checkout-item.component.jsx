import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import './checkout-item.styles.scss';

const CheckoutItem = ( {cartItem} ) =>{

    const {addItemToCart, removeItemFromCart, deleteItemFromCart} = useContext(CartContext);//get the global state reducer

    const { name,price, quantity, imageUrl, totalPrice} = cartItem; //destructure the prop
    
    //function to add product to cart
    const addProductToCart = () => addItemToCart(cartItem);//add the item to the cart

    //function to remove one quantity from the cart
    const removeProductFromCart = () => removeItemFromCart(cartItem); //remove the cart item

    //function to remove all quantities from the cart
    const deleteProductFromCart = () => deleteItemFromCart(cartItem); //remove the cart item

    return(
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img alt={name} src={imageUrl}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeProductFromCart}> 
                    &#10094;
                </div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addProductToCart}> 
                    &#10095;
                </div>
            </span>
            <span className='price'>R {totalPrice ? totalPrice: price}</span> 
            <div className='remove-button' onClick={deleteProductFromCart}>
                &#10005;
            </div>
        </div>
    )
}
export default CheckoutItem;