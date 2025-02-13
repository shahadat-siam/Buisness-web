import { createContext, useEffect, useState } from "react";
import { app } from "../Firebase/firebase.config";
import { 
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut, 
  } from 'firebase/auth' 

export const AuthContext = createContext(null)
const auth = getAuth(app)

const AuthProvider = ( {children} ) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    console.log(user)
    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
      setLoading(true)
      signInWithEmailAndPassword(auth, email, password)
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
        loading
    }

    return (
        <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
    )

}
export default AuthProvider