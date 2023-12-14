
"use client"
import { createContext, useContext, useState, useEffect } from "react"
import { db } from "@/firebase/config"

const ProductContext = createContext()
export const ProductProvider = ({ children }) => {
    const [product, setProduct] = useState({
        slug: "/",
        tittle: "",
        description: "",
        inStock: 0,
        price: 0,
        image: ""
    })

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = db.collection("productos").doc(slug);
                const doc = await docRef.get();
                if (doc.exists) {
                    const data = doc.data();
                    setProduct({
                        slug: product.slug,
                        title: data.title,
                        description: data.description,
                        inStock: data.inStock,
                        price: data.price,
                        image: data.image
                    });
                } else {
                    console.log("El documento no existe");
                }
            } catch (error) {
                console.log("Error al obtener el producto:", error);
            }
        };

        fetchProduct();
    }, [product.slug]);

    const handleProduct = (slug) => setProduct({ slug });

    return (
        <ProductContext.Provider value={{
            product,
            handleProduct
        }}>
            {children}
        </ProductContext.Provider>
    )

}

export const useProductContext = () => useContext(ProductContext)