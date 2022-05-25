import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import {
    CheckoutItemContainer, 
    ImageContainer,
    Image,
    Name,Price,
    Quantity,
    Arrow,
    Value,
    RemoveButton
} from './checkout-item.styles.jsx';

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
        <CheckoutItemContainer>
            <ImageContainer>
                <Image alt={name} src={imageUrl}/>
            </ImageContainer>
            <Name>{name}</Name>
            <Quantity >
                <Arrow onClick={removeProductFromCart}> 
                    &#10094;
                </Arrow>
                <Value>{quantity}</Value>
                <Arrow onClick={addProductToCart}> 
                    &#10095;
                </Arrow>
            </Quantity>
            <Price>R {totalPrice ? totalPrice: price}</Price> 
            <RemoveButton onClick={deleteProductFromCart}>
                &#10005;
            </RemoveButton>
        </CheckoutItemContainer>
    )
}
export default CheckoutItem;