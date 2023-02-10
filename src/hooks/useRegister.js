import { useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { database, authentication } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useRegister = () => {
   const [error, setError] = useState(null)
   const { dispatch } = useAuthContext()

   const register = async (email, password, displayName) => {
      setError(null)
      try {
         const res = await createUserWithEmailAndPassword(authentication, email, password)   
         if (!res) {
            throw new Error('Could not complete signup')
         }
         await updateProfile(authentication.currentUser, {
            displayName
         })
         await setDoc(doc(database, "users", res.user.uid), {
            displayName: displayName,
            createdDocs: []
         });
         dispatch({ type: 'LOGIN', payload: res.user })
      }
      catch(err) {
         setError(err.message)
       }
      // createUserWithEmailAndPassword(authentication, email, password)
      //    .then(res => {
      //       setDoc(doc(database, "users", res.user.uid), {
      //          displayName: displayName
      //       });
      //       dispatch({ type: 'LOGIN', payload: res.user })
      //    })
      //    .catch(err => {
      //       setError(err.message)
      //    })
   }

   return { register, error }
}