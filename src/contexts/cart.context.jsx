import { createContext, useState, useEffect } from "react";

//the actual (default) value you want to access
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    cartQuantity: 0,
    removeItemFromCart: () => {}
});

//the provider is the actual component (functional) | For index.js
export const CartProvider = ({children}) =>{

    const [isCartOpen, setIsCartOpen] = useState(false); //we want to store a cart array
    const [cartItems, setCartItems] = useState([]);
    const [cartQuantity, setCartQuantity] = useState(0);

    //useEffect for the total quantities of the items
    useEffect(()=>{
        const totalQuantities = cartItems.reduce((total, cartItem)=>{
            return total += cartItem.quantity;
        }, 0); //zero is the initial value
        setCartQuantity(totalQuantities);//set the state
    },[cartItems]);

    //function to add the product to the cart
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems,productToAdd));
    }
    //function to add the product to the cart
    const removeItemFromCart = (productToRemove) =>{
        setCartItems(removeCartItem(cartItems,productToRemove));
    }
    //function to delete the product from the cart (all duplicates)
    const deleteItemFromCart = (productToDelete) =>{
        setCartItems(deleteCartItem(cartItems,productToDelete));
    }

    const value = {//we want the child components (all) to be able to access all of the values and their mutators
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        removeItemFromCart, 
        deleteItemFromCart,
        cartItems, 
        cartQuantity
    }; 

    return (
        <CartContext.Provider value={value}>{children}</CartContext.Provider>
    );
}

//helper function to help add new cart items to the cart
const addCartItem = (cartItems, productToAdd) =>{

    //see if cartItems contains product to add
    const product = cartItems.find(item => item.id === productToAdd.id);

    //if found
    if(product){ //product exists, increment quantity
        return cartItems.map(item => item.id === product.id ? 
            { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity+1)*item.price} //spread through all the properties of the cartItem & add a new property
            :
            item//else, return the item as it is
        );
    }
    //return new array with modified cart items/ new cart items
    return [ ...cartItems, {...productToAdd, quantity: 1}]; //spread through all the cartItems and add a product and set it's quantity to 1
}

//helper function to help remove a cart item
const removeCartItem = (cartItems, productToRemove) =>{

    //see if cartItems contains product to add
    const product = cartItems.find( item => item.id === productToRemove.id);

    //if found then there is a minimum of 1
    if(product.quantity === 1)//if there is one 
        return cartItems.filter(item => item.id !== product.id);//return a new array
        
    return cartItems.map(item => item.id === product.id ? 
        { ...item, quantity: item.quantity-1, totalPrice: (item.quantity-1)*item.price} //spread through all the properties of the cartItem & add a new property
        :
        item//else, return the item as it is
    ); 
    
}

//helper function to help remove a cart item
const deleteCartItem = (cartItems, productToDelete) => cartItems.filter(item => item.id !== productToDelete.id);//return a new array
