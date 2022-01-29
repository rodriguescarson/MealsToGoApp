import React, { useState, createContext } from "react";
// import { loginRequest } from "./authentication.service";

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseApp = initializeApp({
    apiKey: "AIzaSyApcTJqLN5H21F6tt9bT4ZMPZbcGUaGOjQ",
    authDomain: "mealstogo-bbcf1.firebaseapp.com",
    projectId: "mealstogo-bbcf1",
    storageBucket: "mealstogo-bbcf1.appspot.com",
    messagingSenderId: "322650187059",
    appId: "1:322650187059:web:243d87c7e12a28ae608a46"
});
const auth = getAuth(firebaseApp);


export const AuthenticationContext = createContext()

export const AuthenticationContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    onAuthStateChanged(auth, (usr) => {
        if (usr) {
            setUser(usr)
            setIsLoading(false)
        } else {
            setIsLoading(false)
        }
    });

    const onLogin = (email, password) => {
        setIsLoading(true);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("user logged in")
                setUser(user);
                setIsLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false);
                setError(errorMessage);
            });
    };

    const onRegister = (email, password, repeatedPassword) => {
        setIsLoading(true);
        if (password !== repeatedPassword) {
            setError("Error: Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user)
                setUser(user);
                setIsLoading(false);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setIsLoading(false);
                setError(errorMessage);
            })
    }
    const onLogout = () => {
        signOut(auth).then(() => {
            setUser(null);
            setError(null);
        });
    }

    return (
        <AuthenticationContext.Provider
            value={{
                isAuthenticated: !!user,
                user,
                isLoading,
                error,
                onLogin,
                onRegister,
                onLogout
            }}
        >
            {children}
        </AuthenticationContext.Provider>
    );
};