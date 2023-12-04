"use client"
import {React, useState} from "react";
import ProductList from "@/components/products/ProductList"
import { Suspense } from "react"
import Link from 'next/link'


export const ItemDirectory = () => {
  return (
    <main className="main-conteiner grid grid-cols-6 px-3">
      <section className="col-span-5 flex justify-center flex-col">
        <div className="product-conteiner col-span-5 grid grid-cols-4">
          
        </div>
      </section>
    </main>
  );
};

const Productos = () => {
  const [categoria, setCategoria] = useState("all");
  const handleCategoria = (key) => setCategoria(key);

  return (
    <main>
      <div className="container m-auto">
            <nav className="flex gap-10 py-4">
                <h4 key="all" onClick={() => handleCategoria("all")}>Todos</h4>
                <h4 key="tvs" onClick={() => handleCategoria("tvs")}>TVs</h4>
                <h4 key="hornos" onClick={() => handleCategoria("hornos")}>Hornos</h4>
                <h4 key="aires" onClick={() => handleCategoria("aires")}>Aires</h4>
            </nav>
        </div>
      <div className="container m-auto pt-8">
          <h2 className="text-4xl text-bold">Productos</h2>
          <hr/>
          <Suspense fallback={<div>Cargando productos...</div>}>
              <ProductList categoria={categoria}/>
          </Suspense>
      </div>
    </main>
  )
}

export default Productos

