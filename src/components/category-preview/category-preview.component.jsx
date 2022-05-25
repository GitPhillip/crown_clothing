import ProductCard from '../product-card/product-card-component';

import {CategoryPreviewContainer,Title,Preview } from './category-preview.styles.jsx';
import { NavLink } from '../../routes/navigation/navigation.styles';

const CategoryPreview = ({ title, products }) =>{

    return(
        <CategoryPreviewContainer>
            <h2>
                <NavLink to={title}>
                    <Title>{title.toUpperCase()}</Title>
                </NavLink>
            </h2>
            <Preview>
            {
                products
                .filter( (_, index) => index<4)//with _ we don't want the instance
                .map(
                    product => (<ProductCard key={product.id} product={product}/>)
                )                
            }
            </Preview>
        </CategoryPreviewContainer>
    );
}
export default CategoryPreview;