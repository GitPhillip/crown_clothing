

import Button from '../button/button.component';

import './product-card.styles.scss';

const ProductCard = ({product}) =>{

    const {name, price, imageUrl} = product; //destructor the properties needed

    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`} />
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button type='button' buttonType='inverted' >Add to cart</Button>
        </div>
    );
}
export default ProductCard