import { useContext, useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';

import { CategoriesContext } from '../../contexts/categories.context';

import ProductCard from '../../components/product-card/product-card-component';
import { CategoryContainer, CategoryTitle } from './category.styles';

const Category = () =>{

    const { category } = useParams();//this is the same as the url param we set in the route

    const { categoriesMap } = useContext(CategoriesContext);//get your global state of categories

    const [products, setProducts] = useState(categoriesMap[category]);//set your local state of products

    //onComponentDidMount, onStateDidChange
    useEffect(()=>{
        setProducts(categoriesMap[category]);//update the product based on the category selected
    },[category,categoriesMap]);

    return(
        <>
            <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
            <CategoryContainer>
                {products && //if products is undefined, don't render | only render if there's a value
                    products.map( product => (<ProductCard key={product.id} product={product}/>))
                }
            </CategoryContainer>
        </>
    )
}
export default Category;