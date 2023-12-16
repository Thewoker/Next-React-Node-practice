"use client"
import React, { useEffect, useState } from 'react';
import { db } from "@/firebase/config";
import { collection, getDoc, doc } from "firebase/firestore";
import { useAuthContext } from "@/contexts/AuthContext"

export default function ShoppinProductDetail({ item }) {
  const [product, setProduct] = useState(null);
  const { rmToCart } = useAuthContext();
  useEffect(() => {
    getProduct(item.product)
      .then((productInfo) => {
        setProduct(productInfo);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [item.product]);

  return (
    <div className=''>
      {product ? (
        <div className='flex flex-row py-1'>
        <button className='bg-red-500 text-white px-7 py-1 rounded mr-3' onClick={()=> rmToCart(item.product, item.quantity)}>X</button>
        <img src={`/imgs/products/${product.image}`} alt={product.title} className='w-[100px]' />
        <div className="px-4">
          <h3 className='text-xl font-bold'>{product.title}</h3>
          <p className='text-gray-500'>{item.quantity}</p>
          <p className='text-green-500 font-bold'>{product.price} $</p>
        </div>
      </div>

      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

const getProduct = (item) => {
  return new Promise((resolve, reject) => {
    const productsRef = collection(db, 'productos');
    getDoc(doc(productsRef, item))
      .then((docSnapshot) => {
        const productInfo = docSnapshot.data();
        resolve(productInfo);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
