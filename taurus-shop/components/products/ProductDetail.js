"use client"
import React from 'react';
import Image from "next/image";
import { usePathname } from 'next/navigation'

const ProductDetail = () => {
    const pathname = usePathname()

    return (
        <div className="flex">
            {console.log(`el path es el siguietnen :${pathname}`)}
        </div>
    );
};

export default ProductDetail;