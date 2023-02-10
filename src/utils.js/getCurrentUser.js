import { getAuth } from "firebase/auth";

export const getCurrentUser = () => {
   const auth = getAuth();
   const user = auth.currentUser;
   if (user !== null) {
      // The user object has basic properties such as display name, email, etc.
      // const displayName = user.displayName;
      // const email = user.email;
      // const photoURL = user.photoURL;
      // const emailVerified = user.emailVerified;
      // const uid = user.uid;

      const auth = getAuth();
      const user = auth.currentUser;
      // const uid = user.uid;
      return user
   }
}
