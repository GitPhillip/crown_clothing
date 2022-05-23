
import './cart-items.styles.scss';

const CartItem = ({ cartItem }) =>{

    const {name, quantity} = cartItem; //destructure the cartItem properties
    
    return(
        <div className='cart-item-container'>
            <h2>{name}</h2>
            <span>{quantity}</span>
        </div>
    )
}
export default CartItem;