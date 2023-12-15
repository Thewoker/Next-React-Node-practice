"use client"
import { auth, db } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';



const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [user, setUser] = useState({
        logged: false,
        email: null,
        uid: null,
        cart: []
    })

    const createUser = async (values) => {
        await createUserWithEmailAndPassword(auth, values.email, values.password).then(async (userCredential) => {
            const userCreds = userCredential.user
            const res = await setDoc(doc(db, "users", userCreds.uid), ({
                cart: {}
            }));
            router.push('/');
        }
        )
    };


    const loginUser = async (values) => {
        await signInWithEmailAndPassword(auth, values.email, values.password).then(() => {
            console.log("Login exitoso");
            router.push('/');
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
    const addToCart = async (newValue, count) => {
        try {
            if (user) {
                const userRef = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userRef);
                const userData = docSnapshot.data();
                const updatedCart = [...userData.cart, { product: newValue, quantity: count }]; // Agregar el nuevo valor como un objeto con las propiedades "product" y "quantity"
                decrementInStock(newValue, count);
                await setDoc(userRef, { cart: updatedCart });
            }
        } catch (error) {
            router.push('/Register');
        }
    }
    const isLoged = () => user ?  router.push('/Register') : router.push('/ShoppingCart')
    const decrementInStock = async (newValue, count) => {
        const productRef = doc(db, 'productos', newValue);
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        const updatedInStock = productData.inStock - count;
        await updateDoc(productRef, { inStock: updatedInStock });
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
                    cart: []
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
            getCart,
            addToCart,
            isLoged
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)