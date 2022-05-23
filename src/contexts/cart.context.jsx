import { createContext, useState } from "react";

//the actual (default) value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {}
});

//the provider is the actual component (functional)
export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false); //we want to store a cart array
    const value = {isCartOpen, setIsCartOpen}; //we want the child components (all) to be able to access the 2

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}