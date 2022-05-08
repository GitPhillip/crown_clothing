
import { useEffect } from "react";

import { 
    auth,
    signInWithGooglePopup, 
    signInWithGoogleRedirect,
    createUserDocumentFromAuth  
} from "../../utils/firebase.utils";

import { getRedirectResult } from "firebase/auth";


const SignIn = () =>{

    //--------------On Mount--------------------
    useEffect(() => {
        async function getResults(){
            const response  = await getRedirectResult(auth); //can view auth as authentication memory our app is tracking regardless of where website is going.
            if(response)
            {
                const {userDocRef} = await createUserDocumentFromAuth(response.user);
            }
        }
        getResults();
    },[]);
    //--------------On Mount--------------------

    const logGoogleUser = async () =>{
        const {user} = await signInWithGooglePopup();
        const {userDocRef} = await createUserDocumentFromAuth(user);
    }

    return(
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>
                Sign in with Google Popup
            </button>
            <button onClick={signInWithGoogleRedirect}>
                Sign in with Google Redirect
            </button>
        </div>
    )
} 
export default SignIn