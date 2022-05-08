// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCM-DTYnIH6m_z2rSLT3VvxO8x_VG7zYRE",
  authDomain: "zeno-clothing-db.firebaseapp.com",
  projectId: "zeno-clothing-db",
  storageBucket: "zeno-clothing-db.appspot.com",
  messagingSenderId: "70813505057",
  appId: "1:70813505057:web:202c702686b37c6927f560",
  measurementId: "G-R33D8XQJ10" //For Firebase JS SDK v7.20.0 and later, measurementId is optional
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

const googleProvider = new GoogleAuthProvider(); //can be Github, facebook etc
googleProvider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth(); //Keeps track of the authentication state of the entire application
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

//Function to create a user document
export const createUserDocumentFromAuth = async(userAuth) =>{

    const {uid,displayName, email} = userAuth; //destructure to get other key-value pairs from the user

    const userDocRef = doc(db, 'users', uid); //find the document that matches the parameters

    const userSnapshot = await getDoc(userDocRef); //get the user snapshot that exists in the document

    if(!userSnapshot.exists()){ //check if the user exists
        const createdAt = new Date(); //get the current date
        try{
            //create the user document with the following data
            await setDoc(userDocRef,{
                displayName, 
                email,
                createdAt
            });
        }catch(error){
            console.log("error creating the user", error.message); //catch any errors
        }
    }else{
        return userDocRef; //do nothing but return the document reference
    }
}