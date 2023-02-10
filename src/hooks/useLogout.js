import { useState } from 'react'
import { signOut } from 'firebase/auth'
import { authentication } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
   const [error, setError] = useState(null)
   const { dispatch } = useAuthContext()

   const logout = () => {
      setError(null)
      signOut(authentication)
         .then(res => {
            dispatch({ type: 'LOGOUT' })
         })
         .catch(err => {
            setError(err.message)
         })
   }

   return { logout, error }
}