import React, { useState, createContext } from "react";
// import { loginRequest } from "./authentication.service";

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

const firebaseApp = initializeApp(require('../../../firebase.config.json'));
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