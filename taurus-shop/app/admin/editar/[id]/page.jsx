"use client"
import React, { useState, useEffect } from 'react'
import { usePathname, useRouter  } from 'next/navigation'
import path from 'path';
import Boton from "@/components/ui/Boton"
import { collection, getDoc, doc, updateDoc } from "firebase/firestore";
import { db, storage } from "@/firebase/config"
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

export default function page() {
    const router = useRouter()
    const pathname = usePathname()
    const currentFolder = path.basename(pathname);
    const [item, setItem] = useState({
        title: "",
        description: "",
        inStock: 0,
        price: 0,
        slug: "",
        type: "",
        image: ""
    });
    const [values, setValues] = useState(item.title, item.description, item.inStock, item.price, item.slug, item.type, item.image);
    const [file, setFile] = useState(null)

    useEffect(() => {
        const fetchProductData = async () => {
            try {
                const productDocRef = doc(db, 'productos', currentFolder);
                const productDocSnap = await getDoc(productDocRef);

                if (productDocSnap.exists()) {
                    const productData = productDocSnap.data();

                    setValues({
                        title: productData.title,
                        description: productData.description,
                        inStock: productData.inStock,
                        price: productData.price,
                        slug: productData.slug,
                        type: productData.type,
                        image: productData.image
                    });
                }
            } catch (error) {
                console.error('Error fetching product data:', error);
            }
        };

        fetchProductData();
    }, []);

    const handleChange = (e) => {
        setValues({
            ...values,
            [e?.target?.name]: e?.target?.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Subir la foto a Firebase Storage y obtener su URL
        if (file) {
            const storageRef = ref(storage, `images/${file.name}`);
            await uploadBytes(storageRef, file);
            // Después de obtener la URL de la imagen subida
            const downloadURL = await getDownloadURL(storageRef);
            values.image = downloadURL
    
            // Verificar si el documento existe antes de actualizarlo
            const productDocRef = doc(db, 'productos', currentFolder);
            const productDocSnap = await getDoc(productDocRef);
    
            if (productDocSnap.exists()) {
                // Actualizar los datos del producto actual en la base de datos
                await updateDoc(productDocRef, values);
            } else {
                console.error('El documento no existe');
            }
        }
    };

    return (
        <div className='container p-4 m-auto mt-6 max-w-lg'>
            <Boton onClick={() => router.push("/admin")}>Volver</Boton>
            <form onSubmit={handleSubmit} className='my-12'>

                <label >Título:</label>
                <input
                    type="text"
                    value={values?.title}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='title'
                    onChange={handleChange}
                />

                <label >Slug:</label>
                <input
                    type="text"
                    value={values?.slug}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='slug'
                    onChange={handleChange}
                />

                <label >Imagen:</label>
                <input
                    required
                    type="file"
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='image'
                    onChange={(e) => setFile(e.target.files[0])}
                />



                <label >Descripción:</label>
                <textarea
                    value={values?.description}
                    className='resize-none p-2 rounded w-full border border-blue-100 block my-4'
                    name='description'
                    onChange={handleChange}
                />

                <label >Categoría:</label>
                <input
                    type="text"
                    value={values?.type}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='type'
                    onChange={handleChange}
                />

                <label >Precio:</label>
                <input
                    type="number"
                    value={values?.price}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='price'
                    onChange={handleChange}
                />

                <label >Stock:</label>
                <input
                    type="number"
                    value={values?.inStock}
                    required
                    className='p-2 rounded w-full border border-blue-100 block my-4'
                    name='inStock'
                    onChange={handleChange}
                />

                <Boton type="submit">Enviar</Boton>
            </form>
        </div>
    )
}
