import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';

import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';

import {ProductCardContainer, Footer, Price, Name} from './product-card.styles';

const ProductCard = ({ product }) =>{

    const {name, price, imageUrl} = product; //destructor the properties needed

    const { addItemToCart} = useContext(CartContext)//get your global state

    //function to add product to cart
    const addProductToCart = () => addItemToCart(product);

    return(
        <ProductCardContainer>
            <img src={imageUrl} alt={`${name}`} />
            <Footer>
                <Name >{name}</Name>
                <Price>{price}</Price>
            </Footer>
            <Button type='button' buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </ProductCardContainer>
    );
}
export default ProductCard