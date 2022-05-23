import { createContext, useState } from "react";

//helper function to help find the existing product
const addCartItem = (cartItems, productToAdd) =>{

    //see if cartItems contains product to add
    const product = cartItems.find( item => item.id === productToAdd.id);

    //if found
    if(product){ //product exists, increment quantity
        return cartItems.map(item => item.id === product.id ? 
            { ...item, quantity: item.quantity + 1} //spread through all the properties of the cartItem & add a new property
            :
            item//else, return the item as it is
        );
    }

    //return new array with modified cart items/ new cart items
    return [ ...cartItems, {...productToAdd, quantity: 1}]; //spread through all the cartItems and add a product and set it's quantity to 1
}

//the actual (default) value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {}
});

//the provider is the actual component (functional) | For index.js
export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false); //we want to store a cart array
    const [cartItems, setCartItems] = useState([]);

    //function to add the product to the cart
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, cartItems}; //we want the child components (all) to be able to access the 2

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}