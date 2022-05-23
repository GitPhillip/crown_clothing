import { createContext, useState, useEffect } from "react";

import ShopData from "../shop-data";

//the actual (default) value you want to access
export const ProductsContext = createContext({
    products: [], //no context when user value is null
    setProducts: () => null
});

//the provider is the actual component (functional)
export const ProductsProvider = ({children}) =>{

    const [products, setProducts] = useState([]); //we want to store a products array
    const value = {products, setProducts}; //we want the child components (all) to be able to access the 2
    
    //on mount
    useEffect(()=>{
        //set the products
        setProducts(ShopData);
    },[]);

    return (<ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>);
}