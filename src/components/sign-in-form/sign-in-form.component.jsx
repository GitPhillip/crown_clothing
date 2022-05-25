import { useState } from "react";

import Button, { BUTTON_TYPE_CLASSES} from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import { 
    signInWithGooglePopup,
    signInAuthWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import { SignUpContainer, Heading2, ButtonsContainer} from './sign-in-form.styles';

//Form fields
const  defaultFormFields = {
    email: '',
    password: ''
}

const SignIn = () =>{

    //Local state
    const [formFields, setFormFields] = useState(defaultFormFields); //set the sdefault tate to the form fields
    const {email, password} = formFields; //destructure the state

    //Function to log the user in
    const signInWithGoogle = async () =>{
        await signInWithGooglePopup(); //get the user returned
    }

    const onChangeHandler = (event) =>{
        const {name, value} = event.target; //destructure to get the name and value of the input element

        setFormFields({...formFields, [name]: value}); //update only what has changed
    }

    //Function to reset the form fields on successful form submission
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    //Function to submit the form
    const SubmitForm = async(event) =>{
        event.preventDefault(); //prevent the form from executing it's on default behavior

        //authenticate the user
        try{
            const {user} = await signInAuthWithEmailAndPassword(email,password);
            resetFormFields();
        }catch(error){
            switch(error.code){
                case 'auth/wrong-password': alert("Incorrect password");
                    break;
                case "auth/user-not-found": alert("User does not exist");
                    break;
                default:
                    console.log(error);

            }
            
            console.log(error);
        }
    }

    return(
        <SignUpContainer>
            <Heading2>I already have an account</Heading2>
            <span>Sign in with your email & password</span>
            <form onSubmit={SubmitForm}>
                <FormInput label='Email' required onChange={onChangeHandler} name='email' value={email} type='text'/>
                <FormInput label='Password' required onChange={onChangeHandler} name='password' value={password} type='password'/>
                <ButtonsContainer>
                    <Button type='submit' >Sign In</Button>
                    <Button buttonType={BUTTON_TYPE_CLASSES.google} type='button' onClick={signInWithGoogle}>GOOGLE SIGN IN</Button>
                </ButtonsContainer>
            </form>
        </SignUpContainer>
    );
}
export default SignIn;