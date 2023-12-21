"use client"
import { auth, db } from "@/firebase/config"
import { signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { createContext, useContext, useEffect, useState } from "react"
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { toast } from "react-toastify";



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
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
            const userCreds = userCredential.user;
            const res = await setDoc(doc(db, "users", userCreds.uid), ({
                cart: {}
            }));
            toast.success("Usuario creado correctamente.", {
                hideProgressBar: true,
              });
            router.push('/');
        } catch (error) {
            toast.error(`El usuario no fue creado correctamente. Error: \n${error}`, {
                hideProgressBar: true,
              });
            console.log("Error al crear el usuario:", error);
            // Puedes agregar aquí el manejo de errores específico que desees
        }
    };


    const loginUser = async (values) => {
        try {
            await signInWithEmailAndPassword(auth, values.email, values.password);
            console.log("Login exitoso");
            toast.success("Usuario Logueado correctamente.", {
                hideProgressBar: true,
              });
            router.push('/');
        } catch (error) {
            toast.error(`El usuario no pudo loguearse correctamente. Error: \n${error}`, {
                hideProgressBar: true,
              });
            console.log("Error al iniciar sesión:", error);
            // Puedes agregar aquí el manejo de errores específico que desees
        }
    }

    const logout = () => {
        signOut(auth)
            .then(() => {
                console.log("Logout exitoso");
                toast.success("Usuario deslogueado correctamente.", {
                    hideProgressBar: true,
                  });
            })
            .catch((error) => {
                toast.error(`Error al desloguearse. Error: \n${error}`, {
                    hideProgressBar: true,
                  });
                console.log("Error al hacer logout:", error);
            });
    }

    const getCart = async () => {
        if (user.logged && user.uid) {
            const userRef = doc(db, 'users', user.uid);
            const docSnapshot = await getDoc(userRef);
            const userData = docSnapshot.data();
            const userCart = userData.cart;
            return userCart;
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
            toast.success("Producto añadido correctamente.", {
                hideProgressBar: true,
              });
        } catch (error) {
            console.log("Error al agregar al carrito:", error);
            console.log(user);
            router.push('/Register');
            toast.error(`El producto no añadido correctamente. Error:\n${error}`, {
                hideProgressBar: true,
              });
            // Puedes agregar aquí el manejo de errores específico que desees
        }
    }
    const rmToCart = async (rmValue, count) => {
        try {
            if (user.logged) {
                const userRef = doc(db, 'users', user.uid);
                const docSnapshot = await getDoc(userRef);
                const userData = docSnapshot.data();
                const updatedCart = userData.cart.filter(item => item.product !== rmValue);
                incrementInStock(rmValue, count);
                await setDoc(userRef, { cart: updatedCart });
                toast.info("Producto removido correctamente.", {
                    hideProgressBar: true,
                  });
            }
        } catch (error) {
            toast.error(`El producto no se pudo remover correctamente. Error:\n${error}`, {
                hideProgressBar: true,
              });
            console.log("Error al eliminar del carrito:", error);
            // Puedes agregar aquí el manejo de errores específico que desees
        }
    }
    const incrementInStock = async (newValue, count) => {
        const productRef = doc(db, 'productos', newValue);
        const productSnapshot = await getDoc(productRef);
        const productData = productSnapshot.data();
        const updatedInStock = productData.inStock + count;
        await updateDoc(productRef, { inStock: updatedInStock });
    }
    const isLoged = async (product, quantity) => {
        await addToCart(product, quantity);
        user.logged ? router.push('/ShoppingCart') : router.push('/Register')
    }
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
            isLoged,
            rmToCart
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext)