import React from "react";
import Image from 'next/image'
import productImg from "/public/Samsung-HG43NE590SF-43-Full-HD-Slim-Direct-Lit.jpg"

export default function ShoppingProductCardDetail() {
  const article = {
    title: "Smart tv Samsung",
    soMany: "3",
    price: "$150.99",
    image: "@/public/",
  };
  return (
    <div className="flex gap-3 outline outline-2 outline-offset-2">
      <Image
        src={productImg}
        width={100}
        height={100}
        alt="Product"
        className="border-1 border-solid"
      />
      <h3>{article.title}</h3>
      <p>{article.soMany}</p>
      <p>{article.price}</p>
    </div>
  );
}
