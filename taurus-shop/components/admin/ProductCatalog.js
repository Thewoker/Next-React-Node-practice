import React, { useEffect } from 'react';
import Link from 'next/link';
import { db } from "@/firebase/config";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";


const ProductCatalog = () => {
    const [items, setItems] = React.useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, "productos"));
            const products = querySnapshot.docs.map(doc => doc.data());
            setItems(products);
        };

        fetchProducts();
    }, []);

    const deleteItem = async (slug) => {
        try {
            // Obtener la referencia al documento que se desea eliminar
            const docRef = doc(db, "productos", slug);

            // Eliminar el documento de Firestore
            await deleteDoc(docRef);

            // Actualizar el estado de los items eliminando el elemento correspondiente
            setItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
        } catch (error) {
            console.error("Error al eliminar el documento:", error);
        }
    };

    return (
        <div className='container m-auto'>
            <Link href={'/admin/create'} className='flex mb-8 font-bold'>Nuevo producto +</Link>
            <div className='flex flex-col align-middle justify-center'>

                {
                    items?.map((item, i) => (
                        <div key={i} className='flex flex-col align-top justify-start p-4 border-2 border-black my-2'>
                            <p>Titulo: {item?.title}</p>
                            <p>Descripcion: {item?.description}</p>
                            <p>Stock: {item?.inStock}</p>
                            <p>Precio: {item?.price}</p>
                            <p>Slug: {item?.slug}</p>
                            <p>Imagen: {item?.image}</p>
                            <p>Tipo: {item?.type}</p>
                            <div className='flex align-middle justify-start my-4'>
                                <Link
                                    href={`/admin/editar/${item.slug}`}
                                    className=' bg-green-400 rounded p-2 text-white mr-2'
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => deleteItem(item?.slug)}
                                    className=' bg-red-600 rounded p-2 text-white mr-2'
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

        </div>
    )
}

export default ProductCatalog