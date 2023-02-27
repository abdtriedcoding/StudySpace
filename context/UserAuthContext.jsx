import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "@/firebaseClient";

const userAuthContext = createContext();

export function UserAuthContext({ children }) {
  const [user, setUser] = useState({});

  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider value={{ user, logOut, googleSignIn }}>
      {children}
    </userAuthContext.Provider>
  );
}

export const useAuth = () => useContext(userAuthContext);
