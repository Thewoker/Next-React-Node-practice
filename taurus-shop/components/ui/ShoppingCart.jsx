import React from "react";
import ShoppingProductDetail from "./../ShoppingProductDetail";
import ShoppingCardDetail from "./../ShoppingCardDetail";

export default function ShoppingCart() {
  return (
    <main className="main-container px-3 min-h-[90vh]">
      <div className="grid grid-cols-3 justify-items-center px-3 bg-[#eddef0] h-[65vw]">
        <div className="product-conteiner justify-items-center col-span-2 p-3 gap-3">
          <h2 className="p-3">Product</h2>
          <div className="">
            <ShoppingProductDetail />
          </div>
        </div>
        <div className="card-detail-conteiner col-span-1 row-span-1 p-3 gap-3">
          <h2 className="p-3">Product</h2>
          <div>
            <ShoppingCardDetail />
          </div>
        </div>
      </div>
    </main>
  );
}
