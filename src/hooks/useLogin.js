import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { authentication } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
   const [error, setError] = useState(null)
   const { dispatch } = useAuthContext()

   const login = (email, password) => {
      setError(null)
      signInWithEmailAndPassword(authentication, email, password)
         .then(res => {
            dispatch({ type: 'LOGIN', payload: res.user })
         })
         .catch(err => {
            setError(err.message)
         })
   }

   return { login, error }
}