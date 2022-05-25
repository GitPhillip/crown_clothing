import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

//the actual (default) value you want to access
export const CategoriesContext = createContext({
    categoriesMap: {}, //no context when user value is null
});

//the provider is the actual component (functional)
export const CategoriesProvider = ({children}) =>{

    const [categoriesMap, setCategoriesMap] = useState({}); //we want to store a products array
    const value = {categoriesMap}; //we want the child components (all) to be able to access the 2
    
    //on mount
    useEffect(()=>{
        const getCatergoriesMap = async () =>{
            const categoryMap = await getCategoriesAndDocuments();
            setCategoriesMap(categoryMap);//update the state
        }
        getCatergoriesMap();
    },[]);

    return (<CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>);
}