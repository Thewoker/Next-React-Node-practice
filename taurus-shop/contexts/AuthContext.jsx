"use client"
import { auth, db } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { doc, setDoc, getDoc } from 'firebase/firestore';



const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null,
        cart: null
    })

    const createUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password).then(async (userCredential) => {
            const userCreds = userCredential.user
            const res = await setDoc(doc(db, "users", userCreds.uid), ({
                cart: {}
            }));
        }
        )
    };


    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
            console.log("Login exitoso");
        })
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logout exitoso");
            })
            .catch((error) => {
                console.log("Error al hacer logout:", error);
            });
    }

    const getCart = async () => {
        if (user && user.uid) {
            const userRef = doc(db, 'users', user.uid);
            const docSnapshot = await getDoc(userRef);
            const userData = docSnapshot.data();
            if (userData && userData.cart) {
                return userData.cart;
            }
        }
        return null;
    }
    const addToCart = async (newValue) => {
        const userRef = doc(db, 'users', user.uid);
        const docSnapshot = await getDoc(userRef);
        const userData = docSnapshot.data();
        const updatedCart = [...userData.cart, newValue];
        await setDoc(userRef, { cart: updatedCart });
    }
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            console.log(user)
            if (user) {
                setUser({
                    logged: true,
                    email: user.email,
                    uid: user.uid,
                    cart: getCart
                })
            } else {
                setUser({
                    logged: false,
                    email: null,
                    uid: null,
                    cart: null
                })
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{
            user,
            createUser,
            loginUser,
            logout,
            getCart
            // addToCart
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)