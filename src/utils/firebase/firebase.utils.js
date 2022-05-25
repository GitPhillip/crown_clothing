// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore,
    doc, 
    getDoc, 
    setDoc,
    collection, //allows us to get a collection reference just like getting a document reference
    writeBatch, //allows all objects that we want to add to the collection are successfully added
    query,
    getDocs
} from 'firebase/firestore';

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

//function to add collection and documents to firebase database
export const addColletionAndDocuments = async (collectioKey, objectsToAdd) =>{
    
    const collectionRef = collection(db, collectioKey);//create your collection

    //need to store each of the objects as a document in this particular collection
    const batch = writeBatch(db);//cretate the batch and pass in sb instance

    //loop through all objects and add them to the batch
    objectsToAdd.forEach(object =>{
        const docRef = doc(collectionRef, object.title.toLowerCase());//this is the instance of the document
        batch.set(docRef, object);//add the object to the document ref

    });

    await batch.commit(); //will begin firing
    console.log('done');
}

//function to get the categories and documents
export const getCategoriesAndDocuments = async () =>{

    const collectionRef = collection(db, 'categories'); //get the collection instance

    const q = query(collectionRef); //will give you an object where you can get a snapshot from

    const querySnapshot = await getDocs(q);//fetch the document snapshots we want

    //we now have acess to all the documents inside our collection as well as the snapshots (data) in the documents
    const categoryMap = querySnapshot.docs.reduce( (accumulator, docSnapshot)=>{
        const { title, items } = docSnapshot.data();//destructure
        accumulator[title.toLowerCase()] = items; //set the items value to be paired with the key of 'titles'
        return accumulator;
    },{});

    return categoryMap;
    
}

//Function to create a user document
export const createUserDocumentFromAuth = async(userAuth, additionalInformation={}) =>{

    if(!userAuth) return; //if we don't get a userAuth, return nothing.

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
                createdAt,
                ...additionalInformation
            });
        }catch(error){
            console.log("error creating the user", error.message); //catch any errors
        }
    }else{
        return userDocRef; //do nothing but return the document reference
    }
}

//Create user with email and password on firebase
export const createAuthUserWithEmailAndPassword = async(email,password) => {
    if(!email || !password)
        return; //do nothing
 
    return await createUserWithEmailAndPassword(auth, email, password);
    
}

//Sign in with the user created with email and password
export const signInAuthWithEmailAndPassword = async(email,password) => {
    if(!email || !password)
        return; //do nothing

    return await signInWithEmailAndPassword(auth, email, password);
    
}

//sign out of any user
export const signOutUser = async() => await signOut(auth); 

//Observe any changes in the auth state
export const onAuthStateChangedListener = (callback) => {
    onAuthStateChanged(auth,callback); //permanently open listener
}