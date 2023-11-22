import React from "react";
import Product from "./Product";
import SortBy from "../SortBy";
import Category from "./../Category";
import { Pagination } from "@nextui-org/react";

export default function ItemDirectory() {
  return (
    <main className="main-conteiner grid grid-cols-6 px-3">
      <section className="filter-section col-span-1 items-center py-5">
        <SortBy />
        <Category />
      </section>
      <section className="col-span-5 flex justify-center flex-col">
        <div className="product-conteiner col-span-5 grid grid-cols-4">
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
          <Product />
        </div>
        <div className='pagination-container flex justify-center'>
          <Pagination showControls total={10} initialPage={1} className="" />
        </div>
      </section>
    </main>
  );
}
