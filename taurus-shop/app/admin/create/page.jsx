"use client"
import React, { useState } from 'react'
import Boton from "@/components/ui/Boton"
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/firebase/config"
import { toast } from "react-toastify";
import { useRouter } from 'next/navigation'


export default function Page() {
    const router = useRouter()
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

    const handleChange = (e) => {
        setValues({
            ...values,
            [e?.target?.name]: e?.target?.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const storageRef = ref(storage, `images/${file.name}`);
        await uploadBytes(storageRef, file);
        const imageUrl = await getDownloadURL(storageRef);
        setValues(prevValues => ({
            ...prevValues,
            image: imageUrl
        }));
        const docRef = doc(db, 'productos', values.slug)
        await setDoc(docRef, {
            ...values,
            image: imageUrl
        })
            .then(() => {
                console.log('produto agregado')
                toast.success("Producto creado correctamente.", {
                    hideProgressBar: true,
                });
            })
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
