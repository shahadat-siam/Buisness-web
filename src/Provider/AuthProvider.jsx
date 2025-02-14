import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut, 
  } from 'firebase/auth' 

export const AuthContext = createContext(null)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    // console.log(user)
    // console.log(loading)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
      setLoading(true)
      return signInWithEmailAndPassword(auth, email, password)
    } 

    const signInGoogle = async () => {
      setLoading(true);
      return signInWithPopup(auth, googleProvider)
    }

    const logout = async () => {
      setLoading(true)
      return signOut(auth)
    }

     // onAuthStateChange
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser)
      console.log('CurrentUser-->', currentUser)
      setLoading(false)
    })
    return () => {
      return unsubscribe()
    }
  }, [])


    const authInfo = {
        user,
        createUser,
        logout,
        login,
        loading,
        setLoading,
        signInGoogle
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )

}
export default AuthProvider;