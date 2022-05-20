import { createContext, useState, useEffect } from "react";

import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils';

//the actual (default) value you want to access
export const UserContext = createContext({
    currentUser: null, //no context when user value is null
    setCurrentUser: () => null
});

//the provider is the actual component
export const UserProvider = ({children}) =>{
    const [currentUser, setCurrentUser] = useState(null); //we want to store a user object
    const value = {currentUser, setCurrentUser}; //we want the child components (all) to be able to access the 2
    
    //on mount
    useEffect(()=>{
        //must stop listening if the component unmounts
        const unsubscribe = onAuthStateChangedListener( (user)=>{
            if(user) createUserDocumentFromAuth(user); //create the user document if it is being passed through
            
            setCurrentUser(user); //set the user
            console.log(user)
        });
        return unsubscribe;
    },[]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}