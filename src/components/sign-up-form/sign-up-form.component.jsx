
import { useState } from 'react';

import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';

import { 
    createAuthUserWithEmailAndPassword,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils';

import { SignUpContainer, Heading2} from '../sign-in-form/sign-in-form.styles';
import {} from './sign-up-form.styles';

//Form fields
const  defaultFormFields = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
}
const SignUpForm = () =>{

    const [formFields, setFormFields] = useState(defaultFormFields); //set the sdefault tate to the form fields
    const { name, email, password, confirmPassword} = formFields; //destructure the state

    const onChangeHandler = (event) =>{
        const {name, value} = event.target; //destructure to get the name and values attributes from the input fields
        
        setFormFields({...formFields, [name]: value}); //update only what has changed
    };

    //Function to reset the form fields on successful form submission
    const resetFormFields = () =>{
        setFormFields(defaultFormFields);
    }

    const SubmitForm = async(event) =>{
        event.preventDefault(); //prevent the form from behaving in a default way

        if(password !== confirmPassword)
            {alert('Passwords do not match'); return;}

        try{
            const {user} = await createAuthUserWithEmailAndPassword(email,password);
            await createUserDocumentFromAuth(user, {name});
            alert('Success');
            resetFormFields();
        }catch(error){
            if(error.code === 'auth/email-already-in-use') alert('Email is already in use');
            else console.log(error);
        }
        
    }

    return(
        <SignUpContainer>
            <Heading2>Don't have an account</Heading2>
            <span>Sign up with email & password</span>
            <form onSubmit={SubmitForm}>
                <FormInput label='Name' required onChange={onChangeHandler} name='name' value={name} type='text'/>
                <FormInput label='Email' required onChange={onChangeHandler} name='email' value={email} type='text'/>
                <FormInput label='Password' required onChange={onChangeHandler} name='password' value={password} type='password'/>
                <FormInput label='Confirm Password' required onChange={onChangeHandler} name='confirmPassword' value={confirmPassword} type='password'/>
                <Button type='submit'>Sign Up</Button>
            </form>
        </SignUpContainer>
    )
}
export default SignUpForm;