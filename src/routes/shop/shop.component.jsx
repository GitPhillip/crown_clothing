
import { useContext } from "react";

import { ProductsContext } from "../../contexts/products.context";

import './shop.styles.scss';

const Shop = () =>{

    const {products} = useContext(ProductsContext); // get the current user from the context
    
    return (
        <div>
            {products.map(  ({id, name}) => (
                <div key={id}>
                    <h1>{name}</h1>
                </div>
            ))
            }
        </div>
    )

}

export default Shop;