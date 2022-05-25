
import {CartItemContainer, Image, ItemDetails, Name } from './cart-item.styles';

const CartItem = ({ cartItem }) =>{

    const {name, imageUrl, price, quantity} = cartItem; //destructure the cartItem properties
    
    return(
        <CartItemContainer>
            <Image alt={`${name}`} src={imageUrl} />
            <ItemDetails>
                <Name className='name'>{name}</Name>
                <span className='price'>
                    {quantity} x R{price}
                </span>
            </ItemDetails>
        </CartItemContainer>
    )
}
export default CartItem;