import { auth } from "../../firebase/firebase.js";
import { onAuthStateChanged } from 'firebase/auth';
import React, { useContext, useState, useEffect } from "react";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return unsubscribe;
    }, [])


    async function initializeUser(user) {
        if (user) {
            setCurrentUser({... user});
            setUserLoggedIn(true);
        }
        else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoading(false);
    }

    const username = currentUser?.email?.split('@')[0] || 'guest';
    const uid = currentUser?.uid || null;
    
    const value = {
        currentUser, 
        userLoggedIn,
        loading,
        username,
        uid
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}

