"use client"
import { React, useState, useEffect } from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation'
import path from 'path';
import { db } from '@/firebase/config';
import { doc, getDoc } from "firebase/firestore"
import { useAuthContext } from '@/contexts/AuthContext'

const ProductDetail = () => {
    const { addToCart, isLoged } = useAuthContext()
    const pathname = usePathname()
    const currentFolder = path.basename(pathname);
    const [product, setProduct] = useState({
        title: "",
        description: "",
        image: "",
        inStock: null,
        price: null,
        slug: ""
    });
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        getProductDetails()
    }, []);

    const getProductDetails = async () => {
        try {
            const productRef = doc(db, 'productos', currentFolder);
            const docSnapshot = await getDoc(productRef);
            const productData = docSnapshot.data();
            if (productData) {
                setProduct({
                    title: productData.title,
                    description: productData.description,
                    image: productData.image,
                    inStock: productData.inStock,
                    price: productData.price,
                    slug: productData.slug
                });
            }
        } catch (error) {
            console.error('Error al obtener los detalles del producto:', error);
        }
    };

    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (newQuantity >= 1 && newQuantity <= product.inStock) {
            setQuantity(newQuantity);
        }
    };

    return (
        <div className="flex flex-wrap">
            <div className="w-[50%] md:w-60% p-4">
                <img src={`/imgs/products/${product.image}`} alt="Product Image" className="w-full h-auto" />
            </div>
            <div className="w-[40%] md:w-40% space-y-4">
                <h2 className="text-xl font-bold">{product.title}</h2>
                <h4 className="text-lg font-bold">$ {product.price}</h4>
                <div className="flex gap-4 items-center">
                    <div>
                        <h5 className="text-md"><b>Stock disponible:</b> {product.inStock}</h5>
                    </div>
                    <div>
                        <input
                            type="number"
                            value={quantity}
                            min="1"
                            max={product.inStock}
                            onChange={handleQuantityChange}
                            className="border border-gray-300 rounded-md px-2 py-1"
                        />
                    </div>
                </div>
                <p className="text-sm">{product.description}</p>
                <div className="flex justify-between">
                    <button className="w-[calc(50%-0.5rem)] rounded-md bg-[#cfb9a5] text-white py-2 px-4 text-center" onClick={() => addToCart(product.slug, quantity)}>Agregar al carrito</button>
                    <button className="w-[calc(50%-0.5rem)] rounded-md bg-[#cfb9a5] text-white py-2 px-4 text-center" onClick={() => isLoged()}>Comprar</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;