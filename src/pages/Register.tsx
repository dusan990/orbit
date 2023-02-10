import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import React, { useState, useRef, ChangeEvent } from 'react'
import { Link } from 'react-router-dom';
import { database } from "../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { useLogin } from '../hooks/useLogin'
import { useRegister } from '../hooks/useRegister'

import { ReactComponent as AppLogo } from '../assets/logo.svg';
import Button from '../components/Button'
import ButtonIcon from "../components/ButtonIcon";
import Textfield from "../components/textfield/Textfield";
import Icon from "../components/Icon";
// import { ReactComponent as AppLogo } from '../assets/logo.svg';

interface State {
   email: string;
   password: string;
   displayName: string;
   showPassword: boolean;
   showClear: boolean;
}

export default function Register() {

   const auth = getAuth();
   const { register, error } = useRegister()
   
   const emailRef = useRef<HTMLInputElement | null>(null);
   const passwordRef = useRef<HTMLInputElement | null>(null);
   const [values, setValues] = React.useState<State>({
      email: '',
      password: '',
      displayName: '',
      showPassword: false,
      showClear: false,
   });

   const handleChange = (event: ChangeEvent, prop: keyof State) => {
      setValues({ ...values, [prop]: (event.target as HTMLInputElement).value });
   };

   const handleClickShowPassword = () => {
      setValues({
         ...values,
         showPassword: !values.showPassword,
      });
   };
   
   const showClearAddon = () => {
      if (emailRef.current!.value === '') {
         values.showClear = false;
      } else {
         values.showClear = true;
      }
   }
   
   async function ResetPassword() {
      await sendPasswordResetEmail(auth, values.email)
         .then(() => {
            console.log("Password reset email sent")
         })
         .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
         })
   }

   const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      // console.log(
      //    values.email, 
      //    values.password,
      //    values.displayName
      // )
      register (
         values.email, 
         values.password,
         values.displayName
      )
   }

   return (
      <main className="main" id="authentication">
         <div className="container">
            <AppLogo className="app-logo" />
            <h3>Create account</h3>
            <p className="caption">Already a member? <Link to="/login">Sign in</Link></p>

            <form className="auth-form" onSubmit={handleFormSubmit}>
               <Textfield
                  type="email"
                  id="email"
                  label="Email"
                  placeholder="e.g. example@email.com"
                  ref={emailRef}
                  addonAfterInput={
                     values.showClear === true ? 
                     <ButtonIcon
                        type="button"
                        variant="btn-icon--ghost"
                        onClick={() => {
                           emailRef.current!.value = "";
                           emailRef.current!.focus();
                           setValues({...values, showClear: false});
                        }}
                        icon={<Icon name="close"/>}
                     /> : undefined
                  }
                  onChange={(event: ChangeEvent<HTMLInputElement>) => {
                     showClearAddon();
                     handleChange(event, 'email');
                  }}
               />

               <Textfield
                  type={values.showPassword ? 'text' : 'password'}
                  id="password"
                  label="Password"
                  placeholder="8-15 characters, at least 1 number and symbol"
                  ref={passwordRef}
                  addonAfterInput={
                     <ButtonIcon
                        type="button"
                        variant="btn-icon--ghost"
                        onClick={ handleClickShowPassword }
                        icon={
                           values.showPassword ? <Icon className="icon40" name="visibility"/> : <Icon name="visibility_off"/>
                        }
                     />
                  }
                  onChange={(event: ChangeEvent<HTMLInputElement>) => 
                     handleChange(event, 'password')
                  }
               />

               <Textfield
                  type="text"
                  id="displayname"
                  label="Display Name"
                  onChange={(event: ChangeEvent<HTMLInputElement>) => 
                     handleChange(event, 'displayName')
                  }
               />

               <Button variant="btn-primary">
                  Create account
               </Button>
               
               {error && <p>{error}</p>}
            </form>
         </div>
      </main>
   )
}